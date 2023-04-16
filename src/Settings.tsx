import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Draggable from "react-draggable";

import { WidgetPicker } from "./settings/WidgetPicker";
import { WallpaperPicker } from "./settings/WallpaperPicker";
import { Button } from "react-bootstrap";
import { About } from "./settings/About";

export const Settings = ({ setDroppingWidgetData, setSettingsOpen }) => {
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
          <Tabs defaultActiveKey="background" className="mb-3">
            <Tab eventKey="background" title="Background">
              <WallpaperPicker />
            </Tab>
            <Tab eventKey="widgets" title="Widgets">
              <WidgetPicker setDroppingWidgetData={setDroppingWidgetData} />
            </Tab>
            <Tab eventKey="about" title="About">
              <About/>
            </Tab>
          </Tabs>
        </div>
      </div>
    </Draggable>
  );
};
