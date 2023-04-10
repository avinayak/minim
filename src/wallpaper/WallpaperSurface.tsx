import { useEffect } from "react";
import { intervalToMicroseconds } from "../data/intervals";
import { CategoryTypes, SourceTypes } from "../gql/graphql";
import { pick } from "../utils";
import { useWallpaper, useWallpaperFetcher } from "./WallpaperContext";

export const WallpaperSurface = ({ tick }: {}) => {
  const trigger = useWallpaperFetcher();
  const wallpaper = useWallpaper();

  useEffect(() => {
    if (wallpaper.changeEvery === "new_tab") {
      trigger({
        source: SourceTypes.Unsplash,
        query: wallpaper.wallpaperCategory,
        category: CategoryTypes.Collection,
      });
    }
  }, []);

  useEffect(() => {
    if (
      wallpaper.changeEvery === "never" ||
      wallpaper.changeEvery === "new_tab"
    )
      return;

    const nextWallpaperChangeAt = parseInt(
      localStorage.getItem("nextWallpaperChangeAt") || "0"
    );

    if (tick > nextWallpaperChangeAt) {
      localStorage.setItem(
        "nextWallpaperChangeAt",
        (tick + intervalToMicroseconds[wallpaper.changeEvery]).toString()
      );
      trigger({
        source: SourceTypes.Unsplash,
        query: wallpaper.wallpaperCategory,
        category: CategoryTypes.Collection,
      });
    }
  }, [tick]);

  return (
    <div>
      <div
        className="shade"
        style={{
          opacity: wallpaper.shade / 100,
        }}
      ></div>
      <div
        style={{
          opacity: wallpaper.tint / 100,
        }}
        className="tint"
      ></div>
      <div
        className="wallpaper"
        style={pick(wallpaper, [
          "background",
          "backgroundImage",
          "blendMode",
          "color",
        ])}
      ></div>
    </div>
  );
};
