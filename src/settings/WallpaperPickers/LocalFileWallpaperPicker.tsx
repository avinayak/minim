import React from "react";
import { LabelledSelector } from "../../components/LabelledSelector";
import { WallpaperContextType } from "../../wallpaper/types";
import {
  useWallpaper,
  useWallpaperDispatch,
  useWallpaperFetcher,
} from "../../wallpaper/WallpaperContext";
import { saveLocalImage, cleanupOldImages } from "../../wallpaper/local-image-store";

export const LocalFileWallpaperPicker = {
  initialWallpaper: {
    background: `linear-gradient(135deg, #e3f2fd 0%, #90caf9 25%, #42a5f5 50%, #1e88e5 75%, #0d47a1 100%)`,
    wallpaperType: "local_file" as const,
    fit: "cover" as const,
    changeEvery: "never" as const,
    color: "white"
  } as WallpaperContextType,
  picker: () => {
    const fit = [
      { label: "Fit", value: "contain" },
      { label: "Center", value: "center" },
      { label: "Stretch", value: "stretch" },
      { label: "Zoom", value: "cover" },
    ];

    const wallpaper = useWallpaper();
    const wallpaperDispatch = useWallpaperDispatch();

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      const maxSize = 20 * 1024 * 1024; // 20MB
      if (file.size > maxSize) {
        alert('Image file is too large. Please select an image smaller than 20MB.');
        return;
      }


      try {
        // Store the image in IndexedDB and get the image ID
        const imageId = await saveLocalImage(file);
        
        // Clean up old images to prevent storage bloat
        await cleanupOldImages();
        
        // Update wallpaper with the image ID reference
        wallpaperDispatch({
          type: "UPDATE_WALLPAPER",
          payload: {
            ...wallpaper,
            background: `local_image:${imageId}`,
            wallpaperType: "local_file",
          },
        });
      } catch (error) {
        console.error('Error saving image:', error);
        alert('Error saving image. Please try a smaller image file.');
      } 
    };

    return (
      <>
        <div style={{ marginBottom: '16px' }}>
          <label htmlFor="wallpaper-file" style={{ display: 'block', marginBottom: '8px' }}>
            Select Wallpaper Image
          </label>
          <input
            id="wallpaper-file"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ width: '100%' }}
          />
        </div>

        <LabelledSelector
          label="Fit"
          value={wallpaper.fit || "cover"}
          options={fit}
          onChange={(newFit) => {
            wallpaperDispatch({
              type: "UPDATE_WALLPAPER",
              payload: {
                ...wallpaper,
                fit: newFit as WallpaperContextType["fit"],
              },
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
