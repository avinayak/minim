import { useState } from "react";
import { useWallpaper } from "../wallpaper/WallpaperContext";
import { Widget } from "./Widget";
import { useGridLayout, useGridLayoutDispatch } from "./GridLayoutContext";

const cartesian = (...a) =>
  a.reduce((a, b) => a.flatMap((d) => b.map((e) => [d, e].flat())));

const grid = cartesian([0, 1, 2], [0, 1, 2]);
const widgetClass = (isLocked, currentWidget, selectedWidget) => {
  if (isLocked) {
    return "";
  } else if (currentWidget === selectedWidget) {
    return "selected-widget";
  } else {
    return "locked-widget";
  }
};

export function WidgetGrid({
  tick,
  unlocked,
  droppingWidgetData,
  setDroppingWidgetData,
  selectedWidget,
  setSettingsTab,
  setSelectedWidget,
}) {
  const { widgets, cells } = useGridLayout();
  const dispatch = useGridLayoutDispatch();
  const { font } = useWallpaper();
  const [dragHoverXY, setDragHoverXY] = useState(null);

  const widgetCells = grid.map(([y, x]) => {
    const widgetsForCell = widgets
      .filter((w) => w.layout.x === x && w.layout.y === y)
      .sort((a, b) => a.lastMovedAt - b.lastMovedAt)
      .map((widget) => (
        <div
          draggable={unlocked}
          onDragStart={() => {
            setDroppingWidgetData({
              widget,
              dropType: "MOVE_WIDGET",
            });
          }}
          key={widget.id}
          className={widgetClass(!unlocked, widget.id, selectedWidget)}
          onClick={() => {
            setSelectedWidget(widget.id);
            setSettingsTab("settings");
          }}
        >
          <Widget tick={tick} unlocked={unlocked} widget={widget} />
        </div>
      ));
    const cellId = `${x}-${y}`;
    const widgetCellId = `widget-cell-${cellId}`;

    const stackingClass = (cells, cellId) =>
      cells[cellId] && cells[cellId].stacking === "horizontal"
        ? `widget-cell-stacking-horizontal-${cellId.split("-")[1]}`
        : "";

    return (
      <div
        id={widgetCellId}
        className={`widget-cell ${
          dragHoverXY && dragHoverXY.x === x && dragHoverXY.y === y
            ? "widget-cell-possible-drop"
            : ""
        } ${dragHoverXY ? "widget-cell-drag-happening-somewhere" : ""}`}
      >
        <div
          className={`widget-cell-inner ${
            cells[cellId] ? `widget-cell-border-${cells[cellId].border}` : ""
          } ${stackingClass(cells, cellId)}`}
        >
          {widgetsForCell}
        </div>
      </div>
    );
  });

  return (
    <div
      className="widget-grid"
      style={{
        fontFamily: font,
      }}
      onDragOver={(e) => {
        e.preventDefault();
        setDragHoverXY({
          x: ~~((e.clientX / e.currentTarget.clientWidth) * 3),
          y: ~~((e.clientY / e.currentTarget.clientHeight) * 3),
        });
      }}
      onDrop={(e) => {
        const id = new Date().getTime().toString();

        const { dropType, widget: droppedWidget } = droppingWidgetData;

        if (dropType === "ADD_WIDGET") {
          dispatch({
            type: "ADD_WIDGET",
            payload: {
              id,
              widgetCode: droppingWidgetData.widget.widgetCode,
              layout: {
                x: dragHoverXY.x,
                y: dragHoverXY.y,
              },
            },
          });
        } else if (dropType === "MOVE_WIDGET") {
          dispatch({
            type: "MOVE_WIDGET",
            payload: {
              id: droppedWidget.id,
              layout: {
                x: dragHoverXY.x,
                y: dragHoverXY.y,
              },
            },
          });
        }

        setDragHoverXY(null);
      }}
    >
      {widgetCells}
    </div>
  );
}
