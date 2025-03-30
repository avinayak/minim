import { WidgetCodeType, WidgetMapType, WidgetPropertiesType } from "../types";
import { clockWidget } from "./clock";
import { messageWidget } from "./message";
import { weatherWidget } from "./weather";
import { timeOfDayWish } from "./timeOfDayWish";
import { timerWidget } from "./timer";
import { linkWidget } from "./link";
import { dateWidget } from "./date";


import "rc-slider/assets/index.css";

export const widgetKeyMap: WidgetMapType = () =>( {
  clock: clockWidget,
  date: dateWidget,
  message: messageWidget,
  weather: weatherWidget,
  wish: timeOfDayWish,
  timer: timerWidget,
  link: linkWidget,
});

export const widgetKeys: WidgetCodeType[] = Object.keys(
  widgetKeyMap()
) as WidgetCodeType[];

export const initialWidgetTemplate = (
  widgetCode: WidgetCodeType
): WidgetPropertiesType => widgetKeyMap()[widgetCode].initialState();

export const Widget = ({
  unlocked,  
  widget,
  tick
}: {
  unlocked: boolean;
  widget: WidgetPropertiesType;
  tick: number;
}) => {
  const renderedWidget = (
    <div className="widget">
      {widgetKeyMap()[widget.widgetCode].renderWidget(widget, tick, unlocked)}
    </div>
  );
  return renderedWidget;
};
