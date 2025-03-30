import { WidgetType } from "../types";
import { useGridLayoutDispatch } from "./GridLayoutContext";
import { LabelledSelector } from "../components/LabelledSelector";
import { Col, Container, Row } from "react-bootstrap";
import { LabelledTextInput } from "../components/LabelledTextInput";
import { TwoLineWidget } from "../components/TwoLineWidget";

const dateFormats = [
  {
    format: "MMMM do yyyy",
    label: (date) =>
      `${monthName(date)} ${ordinal(date.getDate())} ${date.getFullYear()}`,
  },
  {
    format: "MM/dd/yyyy",
    label: (date) =>
      `${pad(date.getMonth() + 1)}/${pad(
        date.getDate()
      )}/${date.getFullYear()}`,
  },
  {
    format: "yyyy-MM-dd",
    label: (date) =>
      `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
        date.getDate()
      )}`,
  },
  {
    format: "dd-MM-yyyy",
    label: (date) =>
      `${pad(date.getDate())}-${pad(
        date.getMonth() + 1
      )}-${date.getFullYear()}`,
  },
  {
    format: "dd/MM/yyyy",
    label: (date) =>
      `${pad(date.getDate())}/${pad(
        date.getMonth() + 1
      )}/${date.getFullYear()}`,
  },
  {
    format: "EEEE, MMMM do yyyy",
    label: (date) =>
      `${weekdayName(date)}, ${monthName(date)} ${ordinal(
        date.getDate()
      )} ${date.getFullYear()}`,
  },
  {
    format: "MMM d, yyyy",
    label: (date) =>
      `${shortMonthName(date)} ${date.getDate()}, ${date.getFullYear()}`,
  },
  {
    format: "d MMM yyyy",
    label: (date) =>
      `${date.getDate()} ${shortMonthName(date)} ${date.getFullYear()}`,
  },
  {
    format: "MMMM d, yyyy",
    label: (date) =>
      `${monthName(date)} ${date.getDate()}, ${date.getFullYear()}`,
  },
  {
    format: "yyyy/MM/dd",
    label: (date) =>
      `${date.getFullYear()}/${pad(date.getMonth() + 1)}/${pad(
        date.getDate()
      )}`,
  },
  {
    format: "do MMMM yyyy",
    label: (date) =>
      `${ordinal(date.getDate())} ${monthName(date)} ${date.getFullYear()}`,
  },
  { format: "MMMM d", label: (date) => `${monthName(date)} ${date.getDate()}` },
  {
    format: "EEEE, MMMM do",
    label: (date) =>
      `${weekdayName(date)}, ${monthName(date)} ${ordinal(date.getDate())}`,
  },
];

function ordinal(n) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

function pad(n) {
  return n.toString().padStart(2, "0");
}

function monthName(date) {
  return date.toLocaleString("en-US", { month: "long" });
}

function shortMonthName(date) {
  return date.toLocaleString("en-US", { month: "short" });
}

function weekdayName(date) {
  return date.toLocaleString("en-US", { weekday: "long" });
}

function formatDate(inputDate, format, timezone) {
  const timezoneObject = timezone ? { timeZone: timezone } : undefined;
  const date = new Date(inputDate.toLocaleString("en-US", timezoneObject));
  const formatter = dateFormats.find((f) => f.format === format);
  return formatter ? formatter.label(date) : date.toISOString();
}

export const dateWidget: WidgetType = {
  widgetCode: "date",
  widgetName: "Date",

  initialState: () => {
    return {
      widgetCode: "date",
      subText: "",
      fontSize: 4,
      dateTimeZone: "",
      dateFormat: "MMMM do yyyy",
    };
  },

  preview: () => <div style={{ fontSize: "20px" }}>November 28th 1993</div>,

  settingsForm: (widget) => {
    const dispatch = useGridLayoutDispatch();
    const timeZoneOptions = [{ label: "Local Time", value: "" }].concat(
      Intl.supportedValuesOf("timeZone").map((tz) => ({
        label: tz.replace(/_/g, " "),
        value: tz,
      }))
    );

    const currentDate = new Date();
    const formattedDateFormats = dateFormats.map(({ format, label }) => ({
      label: label(currentDate),
      value: format,
    }));

    return (
      <>
        <Container fluid>
          <Row>
            <Col md={12}>
              <LabelledSelector
                label="Date Format"
                options={formattedDateFormats}
                value={widget.dateFormat}
                onChange={(dateFormat) => {
                  dispatch({
                    type: "UPDATE_WIDGET",
                    payload: {
                      ...widget,
                      dateFormat,
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
          value={widget.dateTimeZone}
          onChange={(value) => {
            const subText = value
              .split("/")
              [value.split("/").length - 1].replace(/_/g, " ");
            dispatch({
              type: "UPDATE_WIDGET",
              payload: {
                ...widget,
                dateTimeZone: value,
                subText: subText,
              },
            });
          }}
        />
      </>
    );
  },

  renderWidget: (widget) => {
    const date = formatDate(new Date(), widget.dateFormat, widget.dateTimeZone);

    return (
      <TwoLineWidget
        text={date}
        subText={widget.subText}
        fontSize={widget.fontSize}
      />
    );
  },
};
