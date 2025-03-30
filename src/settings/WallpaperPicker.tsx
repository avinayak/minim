import { LabelledSelector } from "../components/LabelledSelector";
import { LabelledSlider } from "../components/Slider";
import { intervalToMicroseconds } from "../data/intervals";
import { WallpaperTypeType } from "../wallpaper/types";

import {
  useWallpaper,
  useWallpaperDispatch,
} from "../wallpaper/WallpaperContext";
import { BackgroundToggles } from "./BackgroundToggles";
import { FlatWallpaperPicker } from "./WallpaperPickers/FlatWallpaperPicker";
import { GradientWallpaperPicker } from "./WallpaperPickers/GradientWallpaperPicker";
import { PhotographyWallpaperPicker } from "./WallpaperPickers/PhotographyWallpaperPicker";

export const WallpaperPicker = () => {
  const wallpaperDispatch = useWallpaperDispatch();
  const wallpaperState = useWallpaper();

  const wallpaperTypeOptions = [
    { label: "Colors", value: "colors" },
    { label: "Gradients", value: "gradients" },
    { label: "Photography", value: "photography" },
  ];

  const walppaperPicker = wallpaperSwitch(wallpaperState.wallpaperType);

  return (
    <>
      <div className="background-controls-panel">
      <LabelledSelector
        label="Wallpaper Type"
        value={wallpaperState.wallpaperType}
        options={wallpaperTypeOptions}
        onChange={(wallpaperType) => {
          const newWallpaperType = wallpaperType as WallpaperTypeType;
          const payload = {
            ...wallpaperState,
            ...wallpaperSwitch(newWallpaperType).initialWallpaper,
          };
          wallpaperDispatch({
            type: "UPDATE_WALLPAPER",
            payload,
          });
        }}
      />

      {wallpaperState.wallpaperType === "photography" && (
        <LabelledSelector
          label="Change every"
          value={wallpaperState.changeEvery || "never"}
          options={[
            { label: "Never", value: "never" },
            { label: "Minute", value: "1_minute" },
            { label: "5 Minutes", value: "5_minutes" },
            { label: "15 Minutes", value: "15_minutes" },
            { label: "Hour", value: "hour" },
            { label: "Day", value: "day" },
            { label: "New Tab", value: "new_tab" },
          ]}
          onChange={(changeEvery) => {
            if (changeEvery === "new_tab") {
              sessionStorage.setItem("new_tab", "ok");
            } else if (changeEvery !== "never") {
              localStorage.setItem(
                "nextWallpaperChangeAt",
                (
                  new Date().getTime() + intervalToMicroseconds[changeEvery]
                ).toString()
              );
            }

            wallpaperDispatch({
              type: "UPDATE_WALLPAPER",
              payload: {
                ...wallpaperState,
                changeEvery,
              },
            });
          }}
        />
      )}

      {walppaperPicker.picker()}

      <LabelledSlider
        label="Tint"
        min={0}
        max={100}
        onChange={(tint) => {
          wallpaperDispatch({
            type: "UPDATE_WALLPAPER",
            payload: {
              ...wallpaperState,
              tint,
            },
          });
        }}
        currentValue={wallpaperState.tint}
      />

      <LabelledSlider
        label="Shade"
        min={0}
        max={100}
        onChange={(shade) => {
          wallpaperDispatch({
            type: "UPDATE_WALLPAPER",
            payload: {
              ...wallpaperState,
              shade,
            },
          });
        }}
        currentValue={wallpaperState.shade}
      />

      {wallpaperState.texture && (
        <LabelledSlider
          label="Texture Density"
          min={3}
          max={40}
          step={2}
          onChange={(textureDensity) => {
            wallpaperDispatch({
              type: "UPDATE_WALLPAPER",
              payload: {
                ...wallpaperState,
                textureDensity,
              },
            });
          }}
          currentValue={wallpaperState.textureDensity}
        />
      )}
      </div>
      <BackgroundToggles />
    </>
  );
};

const wallpaperSwitch = (wallpaperType: WallpaperTypeType) => {
  switch (wallpaperType) {
    case "colors":
      return FlatWallpaperPicker;
    case "gradients":
      return GradientWallpaperPicker;
    case "photography":
      return PhotographyWallpaperPicker;
    default:
      return FlatWallpaperPicker;
  }
};
