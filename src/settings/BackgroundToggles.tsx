import { mdiBlur, mdiSquareOpacity } from "@mdi/js";
import { IconButton } from "../components/IconButton";
import {
  useWallpaper,
  useWallpaperDispatch,
} from "../wallpaper/WallpaperContext";

export function BackgroundToggles() {
  const wallpaperDispatch = useWallpaperDispatch();
  const wallpaper = useWallpaper();

  return (
    <div className="background-toggles">
      <IconButton
        icon={mdiSquareOpacity}
        tooltip="Grayscale"
        on={wallpaper.grayScale}
        onClick={() => {
          wallpaperDispatch({
            type: "UPDATE_WALLPAPER",
            payload: {
              ...wallpaper,
              grayScale: !wallpaper.grayScale,
            },
          });
        }}
      />
      <IconButton
        icon={mdiBlur}
        tooltip="Texture"
        on={wallpaper.texture}
        onClick={() => {
          wallpaperDispatch({
            type: "UPDATE_WALLPAPER",
            payload: {
              ...wallpaper,
              texture: !wallpaper.texture,
            },
          });
        }}
      />
    </div>
  );
}
