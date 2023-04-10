import { createContext, useContext, useReducer } from "react";
import { initialWidgetTemplate } from "./Widget";
import stockLayouts from "../data/stockLayouts.json";
import { WidgetPropertiesType } from "../types";
import { Action } from "../types/reducer";

const GridLayoutContext = createContext<WidgetPropertiesType[]>([]);
const GridLayoutDispatchContext = createContext<React.Dispatch<Action>>(
  () => {}
);

export function WidgetProvider({ children }: { children: React.ReactNode }) {
  const stroredLayoutString = localStorage.getItem("layout");

  if (!stroredLayoutString) {
    localStorage.setItem("layout", JSON.stringify(stockLayouts.default));
  }

  const storedLayout: WidgetPropertiesType[] = stroredLayoutString
    ? (JSON.parse(stroredLayoutString) as WidgetPropertiesType[])
    : stockLayouts.default;

  const [gridLayout, dispatch]: [
    WidgetPropertiesType[],
    React.Dispatch<Action>
  ] = useReducer<React.Reducer<WidgetPropertiesType[], Action>>(
    gridLayoutReducer,
    storedLayout
  );

  return (
    <GridLayoutContext.Provider value={gridLayout}>
      <GridLayoutDispatchContext.Provider value={dispatch}>
        {children}
      </GridLayoutDispatchContext.Provider>
    </GridLayoutContext.Provider>
  );
}

export const useGridLayout = () => {
  return useContext(GridLayoutContext);
};

export const useGridLayoutDispatch = () => {
  return useContext(GridLayoutDispatchContext);
};

function gridLayoutReducer(gridLayout: any, action: any): any {
  let updatedLayout: any = [];
  let lastMovedAt = new Date().getTime();

  switch (action.type) {
    case "ADD_WIDGET":
      updatedLayout = {
        ...gridLayout,
        widgets: [
          ...gridLayout.widgets,
          {
            ...initialWidgetTemplate(action.payload.widgetCode),
            id: action.payload.id,
            lastMovedAt,
            layout: {
              ...action.payload.layout,
            },
          },
        ],
      };
      break;

    case "MOVE_WIDGET":
      const updatedWidgets = gridLayout.widgets.map((w) => {
        if (w.id === action.payload.id) {
          return {
            ...w,
            lastMovedAt,
            layout: {
              ...w.layout,
              x: action.payload.layout.x,
              y: action.payload.layout.y,
            },
          };
        }
        return w;
      });

      updatedLayout = {
        ...gridLayout,
        cells: cleanEmptyCells(gridLayout.cells, updatedWidgets),
        widgets: updatedWidgets,
      };
      break;

    case "DELETE_WIDGET":
      let nonDeletedWidgets = gridLayout.widgets.filter(
        (w) => w.id !== action.payload
      );
      updatedLayout = {
        ...gridLayout,
        cells: cleanEmptyCells(gridLayout.cells, nonDeletedWidgets),
        widgets: nonDeletedWidgets,
      };
      break;

    case "UPDATE_WIDGET":
      updatedLayout = {
        ...gridLayout,
        widgets: gridLayout.widgets.map((w) => {
          if (w.id === action.payload.id) {
            return action.payload;
          }
          return w;
        }),
      };
      break;

    case "UPDATE_CELL":
      updatedLayout = {
        ...gridLayout,
        cells: {
          ...gridLayout.cells,
          [action.id]: action.payload,
        },
      };
      break;
    default:
      throw new Error(`Unhandled Action ${action.type}}`);
  }

  localStorage.setItem("layout", JSON.stringify(updatedLayout));
  return updatedLayout;
}

const cleanEmptyCells = (cells: any, widgets) => {
  const widgetCells = widgets.map((w) => `${w.layout.x}-${w.layout.y}`);
  return Object.keys(cells).reduce((acc, cellId) => {
    if (widgetCells.includes(cellId)) {
      return {
        ...acc,
        [cellId]: cells[cellId],
      };
    }
    return acc;
  }, {});
};
