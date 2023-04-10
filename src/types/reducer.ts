import { Layout } from "react-grid-layout";
import { WidgetCodeType, WidgetPropertiesType } from "./widget";

export type Action =
  | { type: "ADD_WIDGET"; payload: {
        widgetCode: WidgetCodeType
        layout: Layout;
  } }
  | { type: "DELETE_WIDGET"; payload: string | undefined }
  | { type: "UPDATE_WIDGET"; payload: WidgetPropertiesType }
  | {
      type: "UPDATE_LAYOUT";
      payload: {
        layouts: Layout[];
        widgets: WidgetPropertiesType[] | undefined;
      };
    };


export type WidgetsReducerType = (
  state: WidgetPropertiesType[],
  action: Action
) => WidgetPropertiesType[] | undefined;
