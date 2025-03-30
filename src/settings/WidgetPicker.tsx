import { Col, Container, Row } from "react-bootstrap";
import { LabelledSelector } from "../components/LabelledSelector";
import {
  useWallpaper,
  useWallpaperDispatch,
} from "../wallpaper/WallpaperContext";
import { widgetKeys, widgetKeyMap } from "../widgets/Widget";

const fontOptions = [
  { label: "Sans", value: "Product" },
  { label: "Jakarta", value: "JakartaSans" },
  { label: "Circular", value: "Circular" },
  { label: "Futura", value: "Futura" },
  { label: "DIN", value: "DINMediumRegular" },
  { label: "Inter", value: "Inter" },
  { label: "Cardo Regular", value: "CardoRegular" },
  { label: "Cardo Italic", value: "CardoItalic" },
  { label: "system-ui", value: "system-ui" },
];

export const WidgetPicker = ({ setDroppingWidgetData }) => {
  const { font } = useWallpaper();
  const wallpaperDispatch = useWallpaperDispatch();

  return (
    <div>
      <LabelledSelector
        label="Font"
        options={fontOptions}
        value={font}
        onChange={(value) => {
          wallpaperDispatch({
            type: "UPDATE_FONT",
            payload: value,
          });
        }}
      />

      <div className="widgets-add">
        <div className="widget-add-instructions">
          To add a widget, drag and drop it to the screen...
        </div>
        <div className="widgets-add-container">
          <Container>
            <Row>
              {widgetKeys.map((key, index) => (
                <Col md="6">
                  <div
                    key={key}
                    className="widget-picker-preview"
                    draggable={true}
                    unselectable="on"
                    onDragStart={() => {
                      setDroppingWidgetData({
                        widget: {
                          widgetCode: key,
                        },
                        dropType: "ADD_WIDGET",
                      });
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontFamily: font,
                        }}
                      >
                        {widgetKeyMap()[key].preview()}
                      </div>
                    </div>
                  </div>
                  {widgetKeyMap()[key].widgetName}
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};
