import DateTimePicker from "react-datetime-picker";
import { LabelledTextInput } from "../components/LabelledTextInput";
import { TwoLineWidget } from "../components/TwoLineWidget";
import { WidgetType } from "../types";
import { useGridLayoutDispatch } from "./GridLayoutContext";
import { LabelledSelector } from "../components/LabelledSelector";
import { useEffect } from "react";

function getDateXDaysFromToday(x) {
  var today = new Date();
  today.setDate(today.getDate() + x);
  return today;
}

function numberEnding(number) {
  return number > 1 ? "s" : "";
}

function millisecondsToStr(milliseconds) {
  var temp = Math.floor(milliseconds / 1000);
  var years = Math.floor(temp / 31536000);
  if (years) {
    return years + " year" + numberEnding(years);
  }
  //TODO: Months! Maybe weeks?
  var days = Math.floor((temp %= 31536000) / 86400);
  if (days) {
    return days + " day" + numberEnding(days);
  }
  var hours = Math.floor((temp %= 86400) / 3600);
  if (hours) {
    return hours + " hour" + numberEnding(hours);
  }
  var minutes = Math.floor((temp %= 3600) / 60);
  if (minutes) {
    return minutes + " minute" + numberEnding(minutes);
  }
}

function millisecondsToStrComplete(milliseconds) {
  var seconds = Math.floor(milliseconds / 1000);
  var minutes = Math.floor(seconds / 60);
  var hours = Math.floor(minutes / 60);
  var days = Math.floor(hours / 24);
  var years = Math.floor(days / 365);

  days = days - years * 365;
  hours = hours - days * 24 - years * 365 * 24;
  minutes = minutes - days * 24 * 60 - hours * 60 - years * 365 * 24 * 60;
  seconds =
    seconds -
    days * 24 * 60 * 60 -
    hours * 60 * 60 -
    minutes * 60 -
    years * 365 * 24 * 60 * 60;
  var timeStr = "";
  if (years) timeStr += `${years} year${numberEnding(years)} `;
  if (days) timeStr += `${days} day${numberEnding(days)} `;
  if (hours) timeStr += `${hours} hour${numberEnding(hours)} `;
  if (minutes) timeStr += `${minutes} minute${numberEnding(minutes)}`;
  return timeStr;
}

function diffTimeToStr(date1, date2, timer_format) {
  const diffTime = Math.abs(date2 - date1);

  if (timer_format === "m") {
    return Math.floor(diffTime / (1000 * 60));
  } else if (timer_format === "h") {
    return Math.floor(diffTime / (1000 * 60 * 60));
  } else if (timer_format === "d") {
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  } else if (timer_format === "y") {
    return Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365));
  } else if (timer_format === "t") {
    return millisecondsToStr(diffTime);
  } else if (timer_format === "tc") {
    return millisecondsToStrComplete(diffTime);
  }

  return Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365));
}

const timeFormats = [
  {
    label: "Minutes",
    value: "m",
  },
  { label: "Hours", value: "h" },
  { label: "Days", value: "d" },
  { label: "Years", value: "y" },
  { label: "Human Friendly (Trimmed)", value: "t" },
  { label: "Human Friendly", value: "tc" },
];

export const timerWidget: WidgetType = {
  widgetCode: "timer",
  widgetName: "Timer",
  initialState: () => ({
    widgetCode: "timer",
    fontSize: 2,
    borderStyle: "none",
    textBefore: "You have ",
    textAfter: " days left for the Mars mission.",
    format: "d",
    dateTime: getDateXDaysFromToday(8),
    dateTimeRepr: "",
    subText: "",
  }),
  settingsForm: (widget) => {
    const dispatch = useGridLayoutDispatch();

    return (
      <>
        <LabelledTextInput
          label="Text Before"
          lines={2}
          value={widget.textBefore}
          onChange={(textBefore) => {
            dispatch({
              type: "UPDATE_WIDGET",
              payload: {
                ...widget,
                textBefore,
              },
            });
          }}
        />

        <div className="datepicker">
          <DateTimePicker
            onChange={(dateTime) => {
              dispatch({
                type: "UPDATE_WIDGET",
                payload: {
                  ...widget,
                  dateTime,
                },
              });
            }}
            calendarIcon={null}
            clearIcon={null}
            value={new Date(widget.dateTime)}
          />
        </div>

        <LabelledTextInput
          label="Text After"
          lines={2}
          value={widget.textAfter}
          onChange={(textAfter) => {
            dispatch({
              type: "UPDATE_WIDGET",
              payload: {
                ...widget,
                textAfter,
              },
            });
          }}
        />

        <LabelledSelector
          label="Format"
          options={timeFormats}
          value={widget.format}
          onChange={(format) => {
            dispatch({
              type: "UPDATE_WIDGET",
              payload: {
                ...widget,
                format,
              },
            });
          }}
        />
      </>
    );
  },
  renderWidget: (widget, tick) => {
    const dispatch = useGridLayoutDispatch();
    useEffect(() => {
      const date1 = new Date(widget.dateTime);
      const date2 = new Date();

      var dateTimeRepr = diffTimeToStr(date1, date2, widget.format);

      dispatch({
        type: "UPDATE_WIDGET",
        payload: {
          ...widget,
          dateTimeRepr,
        },
      });
    }, [tick]);

    return (
      <TwoLineWidget
        text={widget.textBefore + widget.dateTimeRepr + widget.textAfter}
        subText={widget.subText}
        fontSize={widget.fontSize}
      />
    );
  },
  preview: (_) => (
    <div>
      <div style={{ fontSize: "15px" }}>
        You have 7 days left for the Mars mission.
      </div>
    </div>
  ),
};
