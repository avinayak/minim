import { LabelledSelector } from "../../components/LabelledSelector";
import { CategoryTypes, SourceTypes } from "../../gql/graphql";
import { WallpaperContextType } from "../../wallpaper/types";
import {
  useWallpaper,
  useWallpaperFetcher,
} from "../../wallpaper/WallpaperContext";

export const PhotographyWallpaperPicker = {
  initialWallpaper: {
    background: `url('https://images.unsplash.com/photo-1558826944-1e802b66a7d8?fit=crop&w=${screen.width}&h=${screen.height}'`,
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
  } as WallpaperContextType,
  picker: () => {
    const collections = [
      { label: "Curated by Minim Staff", value: "XwrRKbw8nSI" },
      { label: "Art", value: "c6re3rTrMTA" },
      { label: "Monochrome", value: "11492441" },
      { label: "Wallpapers", value: "1459961" },
      { label: "Nature", value: "3330448" },
      { label: "Textures & Patterns", value: "3330445" },
      { label: "Experimental", value: "9510092" },
      { label: "Floral Beauty", value: "17098" },
      { label: "Film", value: "4694315" },
      { label: "Lush Life", value: "9270463" },
      { label: "Architecture", value: "3348849" },
      { label: "Aurora", value: "9670693" },
    ];

    const wallpaper = useWallpaper();
    const trigger = useWallpaperFetcher();
    return (
      <>
        <LabelledSelector
          label="Category"
          value={wallpaper.wallpaperCategory}
          options={collections}
          onChange={(newCollection) => {
            trigger({
              source: SourceTypes.Unsplash,
              query: newCollection,
              category: CategoryTypes.Collection,
            });
          }}
        />

        {/* <button
          onClick={() => {
            trigger({
              source: SourceTypes.Unsplash,
              query: wallpaper.wallpaperCategory,
              category: CategoryTypes.Collection,
            });
          }}
        >
          Refresh Wallpaper
        </button> */}
      </>
    );
  },
};
