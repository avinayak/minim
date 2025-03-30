import { useEffect } from "react";
import { intervalToMicroseconds } from "../data/intervals";
import { CategoryTypes, SourceTypes } from "../gql/graphql";
import { pick } from "../utils";
import {
  refreshWallpaperfromStore,
  useWallpaper,
  useWallpaperDispatch,
  useWallpaperFetcher,
} from "./WallpaperContext";

export const WallpaperSurface = ({ tick }: {
  tick: number;
}) => {
  const trigger = useWallpaperFetcher();
  const triggerNoRefresh = useWallpaperFetcher(true);
  const wallpaper = useWallpaper();

  const wallpaperDispatch = useWallpaperDispatch();

  useEffect(() => {
    if (wallpaper.changeEvery === "new_tab") {
      refreshWallpaperfromStore(wallpaper, wallpaperDispatch);
      triggerNoRefresh({
        source: SourceTypes.Unsplash,
        query: wallpaper.wallpaperCategory,
        category: CategoryTypes.Collection,
      });
    }
  }, []);

  useEffect(() => {
    if (
      wallpaper.changeEvery === "never" ||
      wallpaper.wallpaperType !== "photography"
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

  const wallpaperStyle = pick(wallpaper, [
    "background",
    "backgroundImage",
    "blendMode",
    "color",
  ]);

  document.body.style.backgroundImage = `${wallpaper.backgroundImage} !important`;
  document.body.style.background = `${wallpaper.background} !important`;

  const textureDensity = wallpaper.textureDensity || 20;
  const textureSize = 0.5 + (textureDensity - 2)/40;

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
        className="dots"
        style={{
          opacity: wallpaper.texture ? 1 : 0,
          backgroundSize: `${textureDensity}px ${textureDensity}px`,
          backgroundImage: `radial-gradient(hsla(0, 0%, 100%, 0.3), ${textureSize}px, transparent 0)`,
        }}
      ></div>
      <div
        className="wallpaper-container"
        style={{
          filter: wallpaper.grayScale ? `grayscale(1)` : ``,
        }}
      >
        <div className="wallpaper" style={wallpaperStyle}></div>
      </div>
    </div>
  );
};
