import { ReactElement } from "react";
import { Layout } from "react-grid-layout";

export type WidgetCodeType = "clock" | "message" | "weather" 


export interface GeneralWidgetPropertiesType {
  widgetCode: WidgetCodeType;
  subText?: string;
  fontSize: number;
  borderStyle: string;

}

export interface WidgetStateType extends GeneralWidgetPropertiesType {
  id: string;
  layout: Layout;
}

export interface ClockWidgetPropertiesType extends WidgetStateType {
  clockTimeZone: string;
  clockFormat: string;
  clockTwelveHour: boolean;
}

export interface MessageWidgetPropertiesType extends WidgetStateType {
  messageText: string;
}

export type WidgetPropertiesType =
  | ClockWidgetPropertiesType
  | MessageWidgetPropertiesType;

export type WidgetType = {
  widgetCode: WidgetCodeType;
  initialState: Partial<WidgetPropertiesType>;
  settingsForm: SettingsFormType;
  renderWidget: RenderWidgetType;
};

export type WidgetMapType = {
  [key in WidgetCodeType]: WidgetType;
};

export type SettingsFormType = (
  arg0: ClockWidgetPropertiesType | MessageWidgetPropertiesType
) => ReactElement;
export type RenderWidgetType = (arg0: WidgetPropertiesType) => ReactElement;
