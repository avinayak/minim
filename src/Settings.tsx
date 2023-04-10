import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Draggable from "react-draggable";

import { WidgetPicker } from "./settings/WidgetPicker";
import { WallpaperPicker } from "./settings/WallpaperPicker";
import { Button } from "react-bootstrap";
import { WidgetSettings } from "./settings/WidgetSettings";

export const Settings = ({
  setDroppingWidgetData,
  selectedWidget,
  setSelectedWidget,
  setSettingsOpen,
  settingsTab,
  setSettingsTab,
}) => {
  return (
    <Draggable handle=".settings-header">
      <div className="settings">
        <div className="settings-header">
          <h4>Settings</h4>
          <Button
            className="settings-close-btn"
            variant="secondary"
            onClick={() => {
              setSettingsOpen(false);
            }}
          >
            ✕
          </Button>
        </div>
        <hr className="divider" />
        <div className="settings-content ">
          <Tabs
            defaultActiveKey="wallpaper"
            activeKey={settingsTab}
            className="mb-3"
            onSelect={(k) => {
              setSettingsTab(k);
              if (k !== "settings") {
                setSelectedWidget(null);
              }
            }}
          >
            <Tab eventKey="widgets" title="Widgets">
              <WidgetPicker setDroppingWidgetData={setDroppingWidgetData} />
            </Tab>
            <Tab eventKey="settings" title="Settings">
              <WidgetSettings selectedWidget={selectedWidget} />
            </Tab>
            <Tab eventKey="background" title="Background">
              <WallpaperPicker />
            </Tab>
          </Tabs>
        </div>
      </div>
    </Draggable>
  );
};
