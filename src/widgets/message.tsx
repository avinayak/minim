import {  WidgetType } from "../types";

export const messageWidget: WidgetType = {
  widgetCode: "message",
  initialState: ()=>({
    widgetCode: "message",
    fontSize: 4,
    borderStyle: "none",

    messageText:
      "Hello World!",
  }),
  settingsForm: (widget) => <>settings from message!</>,
  renderWidget: (widget) => (
    <div>
      <div style={{ fontSize: widget.fontSize  + "vh" }}>
        {widget.messageText}
      </div>
    </div>
  ),
  preview: (widget) => (
    <div>
      <div style={{ fontSize: "50px" }}>
        I think therefore I am.
      </div>
    </div>
  ),
};
