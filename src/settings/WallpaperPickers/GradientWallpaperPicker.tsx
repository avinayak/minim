import { WallpaperContextType } from "../../wallpaper/types";
import {
  useWallpaper,
  useWallpaperDispatch,
} from "../../wallpaper/WallpaperContext";
import gradients from "../../data/gradients.json";
import { arrayToSelectOption } from "../../utils";
import { LabelledSelector } from "../../components/LabelledSelector";

export const GradientWallpaperPicker = {
  picker: () => {
    const wallpaperDispatch = useWallpaperDispatch();
    const wallpaperState = useWallpaper();

    const gradientOptions = arrayToSelectOption(Object.keys(gradients));

    return (
      <>
        <LabelledSelector
          label="Gradient"
          value={wallpaperState.wallpaper}
          options={gradientOptions}
          onChange={(newGradient) => {
            const newWallpaper = gradients[newGradient];
            wallpaperDispatch({
              type: "UPDATE_WALLPAPER",
              payload: {
                ...wallpaperState,
                wallpaperName: newGradient,
                color: "white",
                background: newWallpaper["background-image"],
                blendMode: newWallpaper["blend-mode"],
              },
            });
          }}
        />
      </>
    );
  },
  initialWallpaper: {
    background:
      "linear-gradient(to top, #fcc5e4 0%, #fda34b 15%, #ff7882 35%, #c8699e 52%, #7046aa 71%, #0c1db8 87%, #020f75 100%)",

    color: "white",
    wallpaperName: "Wide Matrix",
    wallpaperType: "gradients",
  } as WallpaperContextType,
};
