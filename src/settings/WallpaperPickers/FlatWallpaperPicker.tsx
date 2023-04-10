import { WallpaperContextType } from "../../wallpaper/types";
import {
  useWallpaper,
  useWallpaperDispatch,
} from "../../wallpaper/WallpaperContext";
import colors from "../../data/colors.json";
import { LabelledSelector } from "../../components/LabelledSelector";
import { arrayToSelectOption } from "../../utils";

export const FlatWallpaperPicker = {
  picker: () => {
    const wallpaperDispatch = useWallpaperDispatch();
    const wallpaperState = useWallpaper();

    const categories = arrayToSelectOption(Object.keys(colors));
    const categoryColors = arrayToSelectOption(
      Object.keys(colors[wallpaperState.wallpaperCategory])
    );

    return (
      <>
        <LabelledSelector
          label="Catalog"
          value={wallpaperState.wallpaperCategory}
          options={categories}
          onChange={(newCategory) => {
            const categoryColors = colors[newCategory];
            const { b: newWallpaper, f: newTextColor } =
              categoryColors[Object.keys(categoryColors)[0]];
            wallpaperDispatch({
              type: "UPDATE_WALLPAPER",
              payload: {
                ...wallpaperState,
                background: newWallpaper,
                color: newTextColor,
                wallpaperCategory: newCategory,
              },
            });
          }}
        />

        <LabelledSelector
          label="Color"
          value={wallpaperState.wallpaperName}
          options={categoryColors}
          onChange={(newWallpaper) => {
            const { b: newWallpaperBackground, f: newTextColor } =
              colors[wallpaperState.wallpaperCategory][newWallpaper];

            wallpaperDispatch({
              type: "UPDATE_WALLPAPER",
              payload: {
                ...wallpaperState,
                background: newWallpaperBackground,
                color: newTextColor,
              },
            });
          }}
        />
      </>
    );
  },
  initialWallpaper: {
    background: "Blue",
    color: "white",
    wallpaperName: "Blue",
    wallpaperCategory: "Brutal Palette",
    wallpaperType: "colors",
  } as WallpaperContextType,
};
