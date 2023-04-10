import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { GraphQLProvider } from "./GraphQLContext";
import {
  useWallpaper,
  useWallpaperFetcher,
  WallpaperProvider,
} from "./wallpaper/WallpaperContext";
import { Settings } from "./Settings";
import { WallpaperSurface } from "./wallpaper/WallpaperSurface";
import { WidgetProvider } from "./widgets/GridLayoutContext";
import { CategoryTypes, SourceTypes } from "./gql/graphql";

import { mdiCog, mdiFire, mdiShimmer } from "@mdi/js";
import { BottomBarButton } from "./components/BottomBarButton";
import { WallpaperInfoSpinner } from "./WallpaperInfoSpinner";
import { WidgetGrid } from "./widgets/WIdgetGrid";

export function App() {
  const [tick, setTick] = useState(new Date().getTime());
  useEffect(() => {
    const interval = setInterval(() => {
      setTick(new Date().getTime());
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  const [droppingWidgetData, setDroppingWidgetData] = useState<string | null>(
    null
  );
  const [selectedWidget, setSelectedWidget] = useState<string | null>(null);
  const [settingsTab, setSettingsTab] = useState<string>("widgets");

  return (
    <div className="App">
      <GraphQLProvider>
        <WallpaperProvider>
          <WidgetProvider>
            {settingsOpen && (
              <Settings
                setDroppingWidgetData={setDroppingWidgetData}
                selectedWidget={selectedWidget}
                setSettingsOpen={setSettingsOpen}
                settingsTab={settingsTab}
                setSettingsTab={setSettingsTab}
                setSelectedWidget={setSelectedWidget}
              />
            )}

            <WidgetGrid
              tick={tick}
              setDroppingWidgetData={setDroppingWidgetData}
              unlocked={settingsOpen}
              droppingWidgetData={droppingWidgetData}
              selectedWidget={selectedWidget}
              setSettingsTab={setSettingsTab}
              setSelectedWidget={setSelectedWidget}
            />
            <div className="bottom">
              <div className="bottom-left">
                <WallpaperInfoSpinner />
              </div>
              <div className="bottom-right">
                <SettingsButton
                  setSettingsOpen={setSettingsOpen}
                  settingsOpen={settingsOpen}
                />
                <RefreshWallpaperButton />
                <ResetAppButton />
              </div>
            </div>
            <WallpaperSurface tick={tick} />
          </WidgetProvider>
        </WallpaperProvider>
      </GraphQLProvider>
    </div>
  );
}

export const SettingsButton = ({
  setSettingsOpen,
  settingsOpen,
}: {
  setSettingsOpen: Dispatch<SetStateAction<boolean>>;
  settingsOpen: boolean;
}) => (
  <BottomBarButton
    onClick={() => {
      setSettingsOpen(!settingsOpen);
    }}
    tooltip="Settings"
    icon={mdiCog}
  />
);

export const RefreshWallpaperButton = () => {
  const trigger = useWallpaperFetcher();
  const { fetchStarted, wallpaperCategory } = useWallpaper();
  return (
    <BottomBarButton
      disabled={fetchStarted}
      onClick={() => {
        trigger({
          source: SourceTypes.Unsplash,
          query: wallpaperCategory,
          category: CategoryTypes.Collection,
        });
      }}
      tooltip="Refresh Wallpaper"
      icon={mdiShimmer}
    />
  );
};

export const ResetAppButton = () => {
  return (
    <BottomBarButton
      onClick={() => {
        localStorage.clear();
        window.location.reload();
      }}
      tooltip="Reset App"
      icon={mdiFire}
    />
  );
};
