export type WallpaperContextType = {
  wallpaper?: string;
  wallpaperId?: string;
  wallpaperName?: string;
  textColor?: string;
  wallpaperCategory?: string;
  wallpaperType: WallpaperTypeType;
  fetchStarted?: boolean;
  font?: string;
  changeEvery?:
    | "never"
    | "new_tab"
    | "1_minute"
    | "5_minutes"
    | "15_minutes"
    | "hour"
    | "day";
  backgroundImage?: string;
  background?: string;
  blendMode?: string;
  color?: string;
  fit?: "contain" | "center" | "stretch" | "cover";
  grayScale?: boolean;
  texture?: boolean;
  tint?: number;
  shade?: number;
  textureDensity?: number;
  meta?: any;
};

export type WallpaperActionType =
  | {
      type: "UPDATE_WALLPAPER";
      payload: WallpaperContextType;
    }
  | {
      type: "UPDATE_FONT";
      payload: string;
    };

export type WallpaperTypeType =
  | "colors"
  | "gradients"
  | "photography"
  | "local_file";
