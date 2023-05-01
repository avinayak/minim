
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