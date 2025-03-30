import { useState } from "react";
import { useWallpaper } from "../wallpaper/WallpaperContext";
import { Widget } from "./Widget";
import { useGridLayout, useGridLayoutDispatch } from "./GridLayoutContext";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { WidgetSettings } from "../settings/WidgetSettings";

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

const cellLocationToPopoverPlacement = (cellLocation) => {
  const [x, y] = cellLocation;
  if (y === 1 && x === 1) {
    return "left";
  } else if (y === 0) return "bottom";
  else if (y === 2) return "top";
  return "auto";
};

const popover = (selectedWidget) => (
  <Popover id="popover-basic">
    <Popover.Body>
      <WidgetSettings selectedWidget={selectedWidget} />
    </Popover.Body>
  </Popover>
);

export function WidgetGrid({
  tick,
  unlocked,
  droppingWidgetData,
  setDroppingWidgetData,
  selectedWidget,
  setSelectedWidget,
  settingsOpen,
}) {
  const { widgets, cells } = useGridLayout();
  const dispatch = useGridLayoutDispatch();
  const { font } = useWallpaper();
  const [dragHoverXY, setDragHoverXY] = useState(null);

  const widgetCells = grid.map(([y, x]) => {
    const widgetsForCell = widgets
      .filter((w) => w.layout.x === x && w.layout.y === y)
      .sort((a, b) => a.lastMovedAt - b.lastMovedAt);

    const maxFontSize = Math.max(
      ...widgetsForCell.map((widget) => widget.fontSize)
    );

    const renderedWidgetsForCell = widgetsForCell.map((widget) => (
      <OverlayTrigger
        trigger="click"
        overlay={popover(selectedWidget)}
        placement={cellLocationToPopoverPlacement([x, y])}
        show={widget.id === selectedWidget && settingsOpen}
        transition={false}
      >
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
          }}
        >
          <Widget tick={tick} unlocked={unlocked} widget={widget} />
        </div>
      </OverlayTrigger>
    ));
    const cellId = `${x}-${y}`;
    const widgetCellId = `widget-cell-${cellId}`;

    const currentCell = cells[cellId];

    const stackingClass = (cells, cellId) =>
      currentCell && currentCell.stacking === "horizontal"
        ? `widget-cell-stacking-horizontal-${cellId.split("-")[1]}`
        : "";

    let borderStyle = {};
    let padding = {
      padding: currentCell?.verticalPadding && currentCell?.horizontalPadding
        ? `${currentCell.verticalPadding}px ${currentCell.horizontalPadding}px`
        : "0px",
       
    };
    if (currentCell) {
      if (currentCell.border === "solid") {
        borderStyle = {
          border: currentCell.borderWidth && `${currentCell.borderWidth}px solid`,
          borderRadius: currentCell.borderRadius && `${currentCell.borderRadius}px`,
        };
      } else if (currentCell.border === "card") {
        borderStyle = {
          borderRadius: currentCell.borderRadius && `${currentCell.borderRadius}px`,
        };
      } else if (currentCell.border === "glassmorphism") {
        borderStyle = {
          borderRadius: currentCell.borderRadius && `${currentCell.borderRadius}px`,
          backdropFilter: currentCell.blur && `blur(${currentCell.blur}px)`,
        };
      } else if (currentCell.border === "black-on-white") {
        borderStyle = {
          borderRadius: currentCell.borderRadius && `${currentCell.borderRadius}px`,
        };
      } else if (currentCell.border === "white-on-black") {
        borderStyle = {
          borderRadius: currentCell.borderRadius && `${currentCell.borderRadius}px`,
        };
      }
    }

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
          style={{
            fontSize: maxFontSize * 2,
            ...borderStyle,
            ...padding,
          }}
          className={`widget-cell-inner ${
            currentCell ? `widget-cell-border-${currentCell.border}` : ""
          } ${stackingClass(cells, cellId)}`}
        >
          {renderedWidgetsForCell}
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
      onClick={(e) => {
        if (e.target.id.startsWith("widget-cell-")) setSelectedWidget(null);
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
