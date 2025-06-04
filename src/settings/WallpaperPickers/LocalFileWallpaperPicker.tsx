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
          <div style={{ position: 'relative' }}>
            <input
              id="wallpaper-file"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ 
                position: 'absolute',
                width: '100%',
                height: '100%',
                opacity: 0,
                cursor: 'pointer',
                zIndex: 1
              }}
            />
            <div style={{
              border: '2px dashed #ccc',
              borderRadius: '8px',
              padding: '20px',
              textAlign: 'center',
              backgroundColor: '#f9f9f9',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              minHeight: '60px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: '8px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#007acc';
              e.currentTarget.style.backgroundColor = '#f0f8ff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#ccc';
              e.currentTarget.style.backgroundColor = '#f9f9f9';
            }}
            >
              <div style={{ fontSize: '24px', color: '#666' }}>📁</div>
              <div style={{ color: '#666', fontSize: '14px' }}>
                Click to select an image file
              </div>
              <div style={{ color: '#999', fontSize: '12px' }}>
                Supports JPG, PNG, GIF, etc. (Max 20MB)
              </div>
            </div>
          </div>
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
