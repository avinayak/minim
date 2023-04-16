import { WidgetType } from "../types";
import { useGridLayoutDispatch } from "./GridLayoutContext";
import { LabelledSelector } from "../components/LabelledSelector";
import { Col, Container, Row } from "react-bootstrap";
import { LabelledTextInput } from "../components/LabelledTextInput";
import { TwoLineWidget } from "../components/TwoLineWidget";

function extractTimeZoneName(tz: string) {
  return tz.replace(/_/g, " ").split("/").pop();
}

function printTime(hours12, ampm, minutes, seperator, timeFormat) {
  const hours24 =
    ampm === "PM" ? (hours12 + 12).toString() : hours12.toString();
  const hours = timeFormat === "HH:mm" ? hours24 : hours12;
  const leadZero =
    !["h:mm", "h:mm A", "HH:mm"].includes(timeFormat) && hours12 < 10
      ? "0"
      : "";
  const trailingSeperator = seperator !== "\n" ? " " : seperator;
  const trailingAmpm =
    timeFormat === "hh:mm A" || timeFormat === "h:mm A"
      ? trailingSeperator + ampm
      : "";
  return leadZero + hours + seperator + minutes + trailingAmpm;
}

export const clockWidget: WidgetType = {
  widgetCode: "clock",
  widgetName: "Clock",

  initialState: () => {
    return {
      widgetCode: "clock",
      subText: "",
      fontSize: 4,
      clockTimeZone: "",
      seperator: ":",
      timeFormat: "hh:mm A",
    };
  },

  preview: () => <div style={{ fontSize: "25px" }}>12:34 PM</div>,

  settingsForm: (widget) => {
    const dispatch = useGridLayoutDispatch();
    const timeZoneOptions = [{ label: "Local Time", value: "" }].concat(
      Intl.supportedValuesOf("timeZone").map((tz) => ({
        label: tz.replace(/_/g, " "),
        value: tz,
      }))
    );

    const seperators = [
      { label: "None", value: "" },
      { label: "Colon", value: ":" },
      { label: "Dot", value: "." },
      { label: "New Line", value: "\n" },
      { label: "Space", value: " " },
    ];

    const timeFormats = [
      { label: "12-hour", value: "h:mm" },
      { label: "12-hour with AM/PM", value: "h:mm A" },
      { label: "12-hour (with zeros)", value: "hh:mm" },
      { label: "12-hour with AM/PM (with zeros)", value: "hh:mm A" },
      { label: "24-hour", value: "HH:mm" },
    ];

    return (
      <>
        <Container fluid>
          <Row>
            <Col md={5}>
              <LabelledSelector
                label="Seperator"
                options={seperators}
                value={widget.seperator}
                onChange={(seperator) => {
                  dispatch({
                    type: "UPDATE_WIDGET",
                    payload: {
                      ...widget,
                      seperator,
                    },
                  });
                }}
              />
            </Col>
            <Col md={7}>
              <LabelledSelector
                label="Clock Format"
                options={timeFormats}
                value={widget.timeFormat}
                onChange={(timeFormat) => {
                  dispatch({
                    type: "UPDATE_WIDGET",
                    payload: {
                      ...widget,
                      timeFormat,
                    },
                  });
                }}
              />
            </Col>
          </Row>
        </Container>
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

        <LabelledSelector
          label="Time Zone"
          options={timeZoneOptions}
          value={widget.clockTimeZone}
          onChange={(value) => {
            const subText = value.split("/")[value.split("/").length - 1];
            dispatch({
              type: "UPDATE_WIDGET",
              payload: {
                ...widget,
                clockTimeZone: value,
                subText: subText,
              },
            });
          }}
        />
      </>
    );
  },

  renderWidget: (widget) => {
    const rawTime = (
      widget.clockTimeZone !== ""
        ? new Date().toLocaleTimeString("en-US", {
            timeZone: widget.clockTimeZone,
          })
        : new Date().toLocaleTimeString("en-US")
    ).split(" ");

    const ampm = rawTime[1];
    const [hours12, minutes, _] = rawTime[0].split(":");

    const time = printTime(
      parseInt(hours12),
      ampm,
      minutes,
      widget.seperator,
      widget.timeFormat
    );
    return (
      <TwoLineWidget
        text={time}
        subText={widget.subText}
        fontSize={widget.fontSize}
      />
    );
  },
};
