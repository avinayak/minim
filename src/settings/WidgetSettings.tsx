import { LabelledSelector } from "../components/LabelledSelector";
import {
  useWallpaper,
  useWallpaperDispatch,
} from "../wallpaper/WallpaperContext";
import { widgetKeyMap } from "../widgets/Widget";
import {
  useGridLayout,
  useGridLayoutDispatch,
} from "../widgets/GridLayoutContext";
import { GeneralSettings } from "./GeneralSettings";
import { Col, Container, Row } from "react-bootstrap";

export const WidgetSettings = ({ selectedWidget }) => {
  const { font } = useWallpaper();
  const wallpaperDispatch = useWallpaperDispatch();

  const { widgets } = useGridLayout();

  const widget = widgets.find((w) => w.id === selectedWidget);

  const cellId = `${widget?.layout.x}-${widget?.layout.y}`;

  const fontOptions = [
    { label: "Product Sans", value: "Product" },
    { label: "Jakarta Sans", value: "JakartaSans" },
    { label: "Circular", value: "Circular" },
    { label: "Futura", value: "Futura" },
    { label: "DIN", value: "DINMediumRegular" },
    { label: "Cardo Regular", value: "CardoRegular" },
    { label: "Cardo Italic", value: "CardoItalic" },
    { label: "system-ui", value: "system-ui" },
  ];
  const wKeyMap = widgetKeyMap();
  return (
    <>
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

      {wKeyMap[widget?.widgetCode] ? (
        <>
          <div>{wKeyMap[widget?.widgetCode].settingsForm(widget)}</div>
          <CellSettings cellId={cellId} />
          <GeneralSettings widget={widget} />
        </>
      ) : (
        <div className="widget-edit-empty">Click on a widget to edit it</div>
      )}
    </>
  );
};

function CellSettings({ cellId }) {
  const { cells, widgets } = useGridLayout();

  const showStacking =
    widgets.filter((w) => `${w.layout.x}-${w.layout.y}` === cellId).length > 1;

  const cellDispatch = useGridLayoutDispatch();
  const cell = cells[cellId] || {
    border: "none",
    stacking: "vertical",
  };

  return (
    <>
    <br/>
      <Container fluid>
        <Row>
          {showStacking && (
            <Col>
              <LabelledSelector
                label="Arrangement"
                options={[
                  { label: "Vertical", value: "vertical" },
                  { label: "Horizontal", value: "horizontal" },
                ]}
                value={cell?.stacking}
                onChange={(value) => {
                  cellDispatch({
                    type: "UPDATE_CELL",
                    payload: { ...cell, stacking: value },
                    id: cellId,
                  });
                }}
              />
            </Col>
          )}
          <Col>
            <LabelledSelector
              label="Border"
              options={[
                { label: "None", value: "none" },
                { label: "Solid", value: "solid" },
                { label: "Circular", value: "circular" },
                { label: "Card", value: "card" },
                { label: "Back on White", value: "black-on-white" },
                { label: "White on Black", value: "white-on-black" },
              ]}
              value={cell?.border}
              onChange={(value) => {
                cellDispatch({
                  type: "UPDATE_CELL",
                  payload: { ...cell, border: value },
                  id: cellId,
                });
              }}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}
