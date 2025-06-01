import { LabelledTextInput } from "../components/LabelledTextInput";
import { TwoLineWidget } from "../components/TwoLineWidget";
import { WidgetType } from "../types";
import { useGridLayoutDispatch } from "./GridLayoutContext";

function getTimeBasedGreeting() {
  const hour = new Date().getHours();

  const greetings = [
    { range: [4, 6], text: "You're up early!" },
    { range: [6, 8], text: "Top of the morning!" },
    { range: [8, 11], text: "Good morning" },
    { range: [11, 13], text: "Happy late morning" },
    { range: [13, 15], text: "Good early afternoon" },
    { range: [15, 17], text: "Good afternoon" },
    { range: [17, 19], text: "Hope you're having a nice evening" },
    { range: [19, 21], text: "Good evening" },
    { range: [21, 23], text: "Winding down? Good night" },
    { range: [23, 24], text: "It's late — time to rest" },
    { range: [0, 1], text: "It's late — time to rest" },
    { range: [1, 4], text: "Burning the midnight oil?" }
  ];


  const greeting = greetings.find(g => hour >= g.range[0] && hour < g.range[1])?.text || "Hello";

  return `${greeting}`;
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
      <div style={{ fontSize: "20px" }}>Good Morning</div>
    </div>
  ),
};
