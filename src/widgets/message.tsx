import { LabelledTextInput } from "../components/LabelledTextInput";
import { TwoLineWidget } from "../components/TwoLineWidget";
import { WidgetType } from "../types";
import { useGridLayoutDispatch } from "./GridLayoutContext";

export const messageWidget: WidgetType = {
  widgetCode: "message",
  widgetName: "Message",
  initialState: () => ({
    widgetCode: "message",
    fontSize: 4,
    borderStyle: "none",
    messageText: "Hello World!",
    subText: "",
  }),
  settingsForm: (widget) => {
    const dispatch = useGridLayoutDispatch();

    return (
      <>
        <LabelledTextInput
          label="Message Text"
          lines={3}
          value={widget.messageText}
          onChange={(messageText) => {
            dispatch({
              type: "UPDATE_WIDGET",
              payload: {
                ...widget,
                messageText,
              },
            });
          }}
        />
        <LabelledTextInput
          label="Sub Text"
          value={widget.subText}
          onChange={(subText) => {
            dispatch({
              type: "UPDATE_WIDGET",
              payload: {
                ...widget,
                subText,
              },
            });
          }}
        />
      </>
    );
  },
  renderWidget: (widget) => (
    <TwoLineWidget
      text={widget.messageText}
      subText={widget.subText}
      fontSize={widget.fontSize}
    />
  ),
  preview: (widget) => (
    <div>
      <div style={{ fontSize: "25px" }}>Hello World!</div>
    </div>
  ),
};
