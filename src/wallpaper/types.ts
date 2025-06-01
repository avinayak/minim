export type WallpaperContextType = {
    wallpaper?: string;
    textColor?: string;
    wallpaperCategory?: string;
    wallpaperType: WallpaperTypeType;
    fetchStarted?: boolean;
    font?: string;
    changeEvery?: "never" | "new_tab" | "daily" | "weekly" | "hour" | "minute";
    backgroundImage?: string;
    background?: string;
    blendMode?: string;
    fit?: "contain" | "center" | "stretch" | "cover";
    grayScale?: boolean;
    texture?: boolean;
    tint?: number;
    shade?: number;
    textureDensity?: number;
    meta?: any;
}

export type WallpaperActionType = {
    type: "UPDATE_WALLPAPER";
    payload: WallpaperContextType;
}

export type WallpaperTypeType = "colors" | "gradients" | "photography" | "local_file";