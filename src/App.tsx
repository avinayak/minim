import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { GraphQLProvider } from "./GraphQLContext";
import {
  useWallpaper,
  useWallpaperFetcher,
  WallpaperProvider,
} from "./wallpaper/WallpaperContext";
import version from "./version.json";

import { Settings } from "./Settings";
import { WallpaperSurface } from "./wallpaper/WallpaperSurface";
import { WidgetProvider } from "./widgets/GridLayoutContext";
import { CategoryTypes, SourceTypes } from "./gql/graphql";
import { mdiAlertDecagram, mdiCog, mdiFire, mdiShimmer } from "@mdi/js";
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
  const [selectedWidget, setSelectedWidget] = useState<string>("1580396533586");

  return (
    <div className="App">
      <GraphQLProvider>
        <WallpaperProvider>
          <WidgetProvider>
            {settingsOpen && (
              <Settings
                setDroppingWidgetData={setDroppingWidgetData}
                setSettingsOpen={setSettingsOpen}
              />
            )}

            <div className="main-surface">
              <WidgetGrid
                tick={tick}
                setDroppingWidgetData={setDroppingWidgetData}
                unlocked={settingsOpen}
                droppingWidgetData={droppingWidgetData}
                selectedWidget={selectedWidget}
                setSelectedWidget={setSelectedWidget}
                settingsOpen={settingsOpen}
              />
              <div className="bottom">
                <div className="bottom-left">
                  <WallpaperInfoSpinner />
                </div>
                <div className="bottom-right">
                  <ChangeLogButton />
                  <SettingsButton
                    setSettingsOpen={setSettingsOpen}
                    settingsOpen={settingsOpen}
                  />
                  <RefreshWallpaperButton />
                  {/* <ResetAppButton /> */}
                </div>
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
  const { fetchStarted, wallpaperCategory, wallpaperType } = useWallpaper();
  return wallpaperType === "photography" ? (
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
  ) : null;
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

export const ChangeLogButton = () => {
  const localStorageChangelogRead = localStorage.getItem(
    `changelog-${version.version.replace(/\./g, "_")}-read`
  );

  if(localStorageChangelogRead === "true") {
    return null;
  }

  return (
    <BottomBarButton
      onClick={() => {
        localStorage.setItem(
          `changelog-${version.version.replace(/\./g, "_")}-read`,
          "true"
        );
        window.open(`https://github.com/avinayak/minim/wiki/Changelog`);
      }}
      tooltip={`What's new in ${version.version}`}
      icon={mdiAlertDecagram}
    />
  );
};
