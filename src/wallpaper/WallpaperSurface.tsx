import { useEffect, useState } from "react";
import { intervalToMicroseconds } from "../data/intervals";
import { CategoryTypes, SourceTypes } from "../gql/graphql";
import { pick } from "../utils";
import {
  refreshWallpaperfromStore,
  useWallpaper,
  useWallpaperDispatch,
  useWallpaperFetcher,
} from "./WallpaperContext";
import { getLocalImage } from "./local-image-store";

export const WallpaperSurface = ({ tick }: {
  tick: number;
}) => {
  const trigger = useWallpaperFetcher();
  const triggerNoRefresh = useWallpaperFetcher(true);
  const wallpaper = useWallpaper();
  const [resolvedBackground, setResolvedBackground] = useState<string>(wallpaper.background || '');

  const wallpaperDispatch = useWallpaperDispatch();

  // Effect to resolve local image references
  useEffect(() => {
    const resolveLocalImage = async () => {
      if (wallpaper.background?.startsWith('local_image:')) {
        try {
          const imageId = wallpaper.background.replace('local_image:', '');
          const base64Image = await getLocalImage(imageId);
          setResolvedBackground(`url('${base64Image}')`);
        } catch (error) {
          console.error('Error loading local image:', error);
          setResolvedBackground(wallpaper.background || '');
        }
      } else {
        setResolvedBackground(wallpaper.background || '');
      }
    };

    resolveLocalImage();
  }, [wallpaper.background]);

  useEffect(() => {
    if (wallpaper.changeEvery === "new_tab") {
      refreshWallpaperfromStore(wallpaper, wallpaperDispatch);
      triggerNoRefresh({
        source: SourceTypes.Unsplash,
        query: wallpaper.wallpaperCategory || "landscape",
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
    "backgroundImage",
    "blendMode", 
    "color",
  ]);

  // Use resolved background instead of original background
  wallpaperStyle.background = resolvedBackground;

  const textureDensity = wallpaper.textureDensity || 20;
  const textureSize = 0.5 + (textureDensity - 2)/40;

  return (
    <div>
      <div
        className="shade"
        style={{
          opacity: (wallpaper.shade || 0) / 100,
        }}
      ></div>
      <div
        style={{
          opacity: (wallpaper.tint || 0) / 100,
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
        <div className={`wallpaper ${wallpaper.wallpaperType === 'local_file' && wallpaper.fit ? `image-fit-${wallpaper.fit}` : 'image-fit-cover'}`} style={wallpaperStyle}></div>
      </div>
    </div>
  );
};
