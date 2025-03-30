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
import { LabelledSlider } from "../components/Slider";

export const WidgetSettings = ({ selectedWidget }) => {
  const { widgets } = useGridLayout();

  const widget = widgets.find((w) => w.id === selectedWidget);
  const cellId = `${widget?.layout.x}-${widget?.layout.y}`;
  const wKeyMap = widgetKeyMap();
  return (
    <>
      {wKeyMap[widget?.widgetCode] ? (
        <>
          <div>{wKeyMap[widget?.widgetCode].settingsForm(widget)}</div>
          <CellSettings cellId={cellId} />
          <GeneralSettings widget={widget} />
        </>
      ) : null}
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

  const cardTypesToControls = {
    none: [],
    solid: ["border-width", "border-radius"],
    card: ["border-radius"],
    glassmorphism: ["border-radius", "blur"],
    "black-on-white": ["border-radius"],
    "white-on-black": ["border-radius"],
  };

  const defaultValues = {
    none: {},
    solid: {
      borderWidth: 5,
      borderRadius: 0,
    },
    card: {
      borderRadius: 20,
      verticalPadding: 5,
      horizontalPadding: 14,
    },
    glassmorphism: {
      borderWidth: 0,
      borderRadius: 20,
      verticalPadding: 5,
      horizontalPadding: 14,
    },
    "black-on-white": {
      borderRadius: 0,
      verticalPadding: 5,
      horizontalPadding: 14,
    },
    "white-on-black": {
      borderRadius: 0,
      verticalPadding: 5,
      horizontalPadding: 14,
    },
  };

  return (
    <>
      <br />
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
          <hr />
          <Col md="12">
            <LabelledSelector
              label="Border"
              options={[
                { label: "None", value: "none" },
                { label: "Solid", value: "solid" },
                { label: "Card", value: "card" },
                { label: "Aero", value: "glassmorphism" },
                { label: "Back on White", value: "black-on-white" },
                { label: "White on Black", value: "white-on-black" },
              ]}
              value={cell?.border}
              onChange={(value) => {
                cellDispatch({
                  type: "UPDATE_CELL",
                  payload: {
                    ...cell,

                    ...defaultValues[value],
                    border: value,
                  },
                  id: cellId,
                });
              }}
            />
          </Col>
          {cardTypesToControls[cell.border].includes("border-width") && (
            <Col md="6">
              <LabelledSlider
                label="Border Width"
                min={1}
                max={50}
                onChange={(borderWidth) => {
                  cellDispatch({
                    type: "UPDATE_CELL",
                    payload: { ...cell, borderWidth },
                    id: cellId,
                  });
                }}
                currentValue={cell.borderWidth}
              />
            </Col>
          )}
          {cardTypesToControls[cell.border].includes("border-radius") && (
            <Col md="6">
              <LabelledSlider
                label="Border Radius"
                min={0}
                max={200}
                onChange={(borderRadius) => {
                  cellDispatch({
                    type: "UPDATE_CELL",
                    payload: { ...cell, borderRadius },
                    id: cellId,
                  });
                }}
                currentValue={cell.borderRadius}
              />
            </Col>
          )}
          {cardTypesToControls[cell.border].includes("blur") && (
            <Col md="6">
              <LabelledSlider
                label="Blur"
                min={1}
                max={30}
                onChange={(blur) => {
                  cellDispatch({
                    type: "UPDATE_CELL",
                    payload: { ...cell, blur },
                    id: cellId,
                  });
                }}
                currentValue={cell.blur}
              />
            </Col>
          )}
             <Col md="6">
              <LabelledSlider
                label="Vertical Padding"
                min={1}
                max={100}
                onChange={(verticalPadding) => {
                  cellDispatch({
                    type: "UPDATE_CELL",
                    payload: { ...cell, verticalPadding },
                    id: cellId,
                  });
                }}
                currentValue={cell.verticalPadding}
              />
            </Col>
            <Col md="6">
              <LabelledSlider
                label="Horizontal Padding"
                min={1}
                max={100}
                onChange={(horizontalPadding) => {
                  cellDispatch({
                    type: "UPDATE_CELL",
                    payload: { ...cell, horizontalPadding },
                    id: cellId,
                  });
                }}
                currentValue={cell.horizontalPadding}
              />
            </Col>
        </Row>
      </Container>
    </>
  );
}
