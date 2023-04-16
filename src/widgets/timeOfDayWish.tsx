import { LabelledTextInput } from "../components/LabelledTextInput";
import { TwoLineWidget } from "../components/TwoLineWidget";
import { WidgetType } from "../types";
import { useGridLayoutDispatch } from "./GridLayoutContext";

function getTimeBasedGreeting() {
  const currentHour = new Date().getHours();
  let greeting;

  if (currentHour >= 5 && currentHour < 12) {
    greeting = "Good Morning";
  } else if (currentHour >= 12 && currentHour < 18) {
    greeting = "Good Afternoon";
  } else if (currentHour >= 17 && currentHour < 22) {
    greeting = "Good Evening";
  } else {
    greeting = "Good Night";
  }

  return greeting;
}

export const timeOfDayWish: WidgetType = {
  widgetCode: "wish",
  widgetName: "Greeting",
  initialState: () => ({
    widgetCode: "wish",
    fontSize: 2,
    borderStyle: "none",
    messageText: getTimeBasedGreeting(),
    userName: "",
  }),
  settingsForm: (widget) => {
    const dispatch = useGridLayoutDispatch();
    return (
      <>
        <LabelledTextInput
          label="Your Name"
          value={widget.userName}
          onChange={(userName) => {
            dispatch({
              type: "UPDATE_WIDGET",
              payload: {
                ...widget,
                userName,
              },
            });
          }}
        />
      </>
    );
  },
  renderWidget: (widget) => (
    <TwoLineWidget
      text={
        getTimeBasedGreeting() +
        (widget.userName && widget.userName.length > 0
          ? `, ${widget.userName}`
          : ``)
      }
      fontSize={widget.fontSize}
    />
  ),
  preview: () => (
    <div>
      <div style={{ fontSize: "20px" }}>{getTimeBasedGreeting()}</div>
    </div>
  ),
};
