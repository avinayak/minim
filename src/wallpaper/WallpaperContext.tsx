import { useLazyQuery } from "@apollo/client";
import { createContext, useCallback, useContext, useReducer } from "react";
import {
  RandomImageQueryDocument,
  RandomImageQueryQueryVariables,
} from "../gql/graphql";
import { addUnsplashScalingParams, omit } from "../utils";
import {
  doesStoreHaveUnviewedImages,
  fetchLatestImage,
  storeImage,
} from "./image-store";
import { WallpaperActionType, WallpaperContextType } from "./types";

const WallpaperContext = createContext<WallpaperContextType>({
  wallpaperType: "photography",
});

const WallpaperDispatchContext = createContext<
  React.Dispatch<WallpaperActionType>
>(() => {});

export function WallpaperProvider({ children }: { children: React.ReactNode }) {
  let defaultWallpaper = {
    background: `url('https://images.unsplash.com/photo-1558826944-1e802b66a7d8?fit=crop&w=${screen.width}&h=${screen.height}'`,
    grayScale: false,
    texture: false,
    wallpaperType: "photography",
    wallpaperCategory: "XwrRKbw8nSI",
    color: "white",
    meta: {
      fullName: "BRUNO",
      altDescription: "Green Leaves",
      username: "brunocervera",
      color: "green",
      link: "https://unsplash.com/photos/Rq9X_ZYvBkM",
    },
    font: "Product",
    tint: 3,
    shade: 3,
    textureDensity: 20,
    changeEvery: "hour",
  } as WallpaperContextType;

  if (localStorage.getItem("nextWallpaperChangeAt") === null) {
    localStorage.setItem(
      "nextWallpaperChangeAt",
      (new Date().getTime() + 60 * 60 * 1000).toString()
    );
  }

  const stroredWallpaperString = localStorage.getItem("wallpaper");

  if (!stroredWallpaperString) {
    localStorage.setItem("wallpaper", JSON.stringify(defaultWallpaper));
  }

  const storedWallpaper = stroredWallpaperString
    ? (JSON.parse(stroredWallpaperString) as WallpaperContextType)
    : defaultWallpaper;

  const [wallpaper, dispatch] = useReducer<
    React.Reducer<WallpaperContextType, WallpaperActionType>
  >(wallpaperReducer, storedWallpaper);
  return (
    <WallpaperContext.Provider value={wallpaper}>
      <WallpaperDispatchContext.Provider value={dispatch}>
        {children}
      </WallpaperDispatchContext.Provider>
    </WallpaperContext.Provider>
  );
}

export const useWallpaper = () => {
  return useContext(WallpaperContext);
};

export const useWallpaperDispatch = () => {
  return useContext(WallpaperDispatchContext);
};

function wallpaperReducer(
  wallpaper: WallpaperContextType,
  action: WallpaperActionType
): WallpaperContextType {
  let updatedWallpaperState = wallpaper;
  switch (action.type) {
    case "UPDATE_WALLPAPER":
      updatedWallpaperState = action.payload;
      break;
    case "UPDATE_FONT":
      updatedWallpaperState = {
        ...wallpaper,
        font: action.payload,
      };
      break;
    default:
      updatedWallpaperState = wallpaper;
      break;
  }

  try {
    localStorage.setItem(
      "wallpaper",
      JSON.stringify(omit(updatedWallpaperState, ["fetchStarted"]))
    );
  } catch (e) {
    console.log(e);
  }

  return updatedWallpaperState;
}

export function useSilentWallpaperFetcher() {
  const [getRandomImage] = useLazyQuery(RandomImageQueryDocument, {
    onCompleted: async (response) => {
      const randomImage = response.randomImage;

      randomImage &&
        randomImage.urls?.full &&
        (await storeImage(
          addUnsplashScalingParams(randomImage.urls.full),
          randomImage
        ));
    },
  });

  const fetchRandomImage = useCallback(
    (variables: RandomImageQueryQueryVariables) => {
      doesStoreHaveUnviewedImages().then((result) => {
        if (!result) {
          getRandomImage({
            fetchPolicy: "no-cache",
            variables,
          });
        }
      });
    },
    [getRandomImage]
  );

  return fetchRandomImage;
}

export function useWallpaperFetcher(noRefresh = false) {
  const wallpaperDispatch = useWallpaperDispatch();
  const wallpaperState = useWallpaper();
  const [getRandomImage] = useLazyQuery(RandomImageQueryDocument, {
    onCompleted: async (response) => {
      const randomImage = response.randomImage;
      const meta =
        randomImage && randomImage.links
          ? {
              link: randomImage.links?.download
                ?.split("/")
                .slice(0, -1)
                .join("/"),
              fullName: (randomImage.user?.lastName
                ? randomImage.user?.firstName + " " + randomImage.user?.lastName
                : randomImage.user?.firstName
              ).trim(),
              description: randomImage.description,
              altDescription: randomImage.altDescription,
              username: randomImage.user?.username,
              color: randomImage.color,
              exif: randomImage.exif,
              location: randomImage.location,
              userLink: randomImage.user?.links?.html,
            }
          : undefined;
      randomImage &&
        randomImage.urls?.full &&
        (await storeImage(
          addUnsplashScalingParams(randomImage.urls.full),
          meta
        ));

      fetchLatestImage().then(
        noRefresh
          ? () => {}
          : ({ wallpaper_url, meta: metadata }) => {
              wallpaperDispatch({
                type: "UPDATE_WALLPAPER",
                payload: {
                  ...wallpaperState,
                  meta: metadata,
                  background: `url('${wallpaper_url}')`,
                  color: "white",
                  fetchStarted: false,
                },
              });
            }
      );
    },
  });

  const fetchRandomImage = useCallback(
    (variables: RandomImageQueryQueryVariables) => {
      wallpaperDispatch({
        type: "UPDATE_WALLPAPER",
        payload: {
          ...wallpaperState,
          wallpaperCategory: variables.query,
          fetchStarted: true,
        },
      });
      getRandomImage({
        fetchPolicy: "no-cache",
        variables,
      });
    },
    [getRandomImage, wallpaperState]
  );

  return fetchRandomImage;
}

export function refreshWallpaperfromStore(wallpaper, wallpaperDispatch) {
  fetchLatestImage().then(({ wallpaper_url, meta }) => {
    wallpaperDispatch({
      type: "UPDATE_WALLPAPER",
      payload: {
        ...wallpaper,
        meta,
        background: `url('${wallpaper_url}')`,
        color: "white",
        fetchStarted: false,
      },
    });
  });
}
