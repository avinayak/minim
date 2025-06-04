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

  export type WidgetCodeType = 
    | "clock" 
    | "date" 
    | "message" 
    | "weather" 
    | "wish" 
    | "timer" 
    | "link"
    | "japaneseMicroseasons";

  export interface Layout {
    x: number;
    y: number;
  }

  export type WidgetPropertiesType = GeneralWidgetPropertiesType & {
    id?: string;
    layout?: Layout;
    [key: string]: any;
  };

  export interface WidgetType {
    widgetCode: WidgetCodeType;
    widgetName: string;
    initialState: () => WidgetPropertiesType;
    settingsForm: (widget: WidgetPropertiesType) => JSX.Element;
    renderWidget: (widget: WidgetPropertiesType, tick?: number, unlocked?: boolean) => JSX.Element;
    preview: (widget?: WidgetPropertiesType) => JSX.Element;
  }

  export type WidgetMapType = () => Record<WidgetCodeType, WidgetType>;