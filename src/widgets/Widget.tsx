import { WidgetCodeType, WidgetMapType, WidgetPropertiesType } from "../types";
import { clockWidget } from "./clock";
import { messageWidget } from "./message";
import { weatherWidget } from "./weather";
import { timeOfDayWish } from "./timeOfDayWish";

import "rc-slider/assets/index.css";

export const widgetKeyMap: WidgetMapType = () =>( {
  clock: clockWidget,
  message: messageWidget,
  weather: weatherWidget,
  wish: timeOfDayWish
});

export const widgetKeys: WidgetCodeType[] = Object.keys(
  widgetKeyMap()
) as WidgetCodeType[];

export const initialWidgetTemplate = (
  widgetCode: WidgetCodeType
): WidgetPropertiesType => widgetKeyMap()[widgetCode].initialState();

export const Widget = ({
  widget,
  tick
}: {
  unlocked: boolean;
  widget: WidgetPropertiesType;
  tick: number;
}) => {
  const renderedWidget = (
    <div className="widget">
      {widgetKeyMap()[widget.widgetCode].renderWidget(widget, tick)}
    </div>
  );
  return renderedWidget;
};
