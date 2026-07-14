import { useLazyQuery } from "@apollo/client";
import {
  createContext,
  useCallback,
  useContext,
  useReducer,
  useRef,
} from "react";
import {
  RandomImageQueryDocument,
  RandomImageQueryQueryVariables,
} from "../gql/graphql";
import { addUnsplashScalingParams, omit } from "../utils";
import { WallpaperActionType, WallpaperContextType } from "./types";
import {
  photographyImageMetadata,
  trackPhotographySelection,
} from "./wallpaper";

const WallpaperContext = createContext<WallpaperContextType>({
  wallpaperType: "photography",
});

const WallpaperDispatchContext = createContext<
  React.Dispatch<WallpaperActionType>
>(() => {});

let wallpaperFetchGeneration = 0;

export function cancelPendingWallpaperFetches() {
  wallpaperFetchGeneration += 1;
}

export function WallpaperProvider({ children }: { children: React.ReactNode }) {
  let defaultWallpaper = {
    background: `url('https://images.unsplash.com/photo-1558826944-1e802b66a7d8?fit=crop&w=${screen.width}&h=${screen.height}'`,
    grayScale: false,
    texture: false,
    wallpaperType: "photography",
    wallpaperId: "Rq9X_ZYvBkM",
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

export function useWallpaperFetcher() {
  const wallpaperDispatch = useWallpaperDispatch();
  const wallpaperState = useWallpaper();
  const wallpaperStateRef = useRef(wallpaperState);
  wallpaperStateRef.current = wallpaperState;
  const [getRandomImage] = useLazyQuery(RandomImageQueryDocument);

  const fetchRandomImage = useCallback(
    async (variables: RandomImageQueryQueryVariables) => {
      wallpaperFetchGeneration += 1;
      const requestGeneration = wallpaperFetchGeneration;
      const nextWallpaper = {
        ...wallpaperStateRef.current,
        wallpaperCategory: variables.query,
        fetchStarted: true,
      };
      wallpaperStateRef.current = nextWallpaper;
      wallpaperDispatch({
        type: "UPDATE_WALLPAPER",
        payload: nextWallpaper,
      });

      try {
        const response = await getRandomImage({
          fetchPolicy: "no-cache",
          variables,
        });
        if (requestGeneration !== wallpaperFetchGeneration) return;

        const randomImage = response.data?.randomImage;
        wallpaperDispatch({
          type: "UPDATE_WALLPAPER",
          payload: randomImage?.urls?.full
            ? {
                ...wallpaperStateRef.current,
                wallpaperId: randomImage.id,
                meta: photographyImageMetadata(randomImage),
                background: `url('${addUnsplashScalingParams(
                  randomImage.urls.full
                )}')`,
                color: "white",
                fetchStarted: false,
              }
            : { ...wallpaperStateRef.current, fetchStarted: false },
        });

        if (randomImage?.urls?.full) trackPhotographySelection(randomImage);
      } catch {
        if (requestGeneration !== wallpaperFetchGeneration) return;
        wallpaperDispatch({
          type: "UPDATE_WALLPAPER",
          payload: { ...wallpaperStateRef.current, fetchStarted: false },
        });
      }
    },
    [getRandomImage]
  );

  return fetchRandomImage;
}
