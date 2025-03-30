import { LabelledTextInput } from "../components/LabelledTextInput";
import { TwoLineWidget } from "../components/TwoLineWidget";
import { WidgetType } from "../types";
import { useGridLayoutDispatch } from "./GridLayoutContext";

export const linkWidget: WidgetType = {
  widgetCode: "link",
  widgetName: "Link",
  initialState: () => ({
    widgetCode: "link",
    fontSize: 4,
    borderStyle: "none",
    linkText: "Google",
    url: "https://www.google.com",
  }),
  settingsForm: (widget) => {
    const dispatch = useGridLayoutDispatch();

    return (
      <>
        <LabelledTextInput
          label="Link Text"
          lines={3}
          value={widget.linkText}
          onChange={(linkText) => {
            dispatch({
              type: "UPDATE_WIDGET",
              payload: {
                ...widget,
                linkText,
              },
            });
          }}
        />
        <LabelledTextInput
          label="URL"
          value={widget.url}
          onChange={(url) => {
            dispatch({
              type: "UPDATE_WIDGET",
              payload: {
                ...widget,
                url,
              },
            });
          }}
        />
      </>
    );
  },
  renderWidget: (widget, _, unlocked) =>
    unlocked ? (
      <TwoLineWidget text={widget.linkText} fontSize={widget.fontSize} />
    ) : (
      <LinkWidgetBody
        text={widget.linkText}
        link={widget.url}
        fontSize={widget.fontSize}
      />
    ),
  preview: (widget) => (
    <div>
      <div style={{ fontSize: "25px" }}>Google</div>
    </div>
  ),
};

function LinkWidgetBody({ text, link, fontSize }) {
  return (
    <div>
      <a
        style={{
          textDecoration: "none",
          all: "unset",
          color: "inherit",
          cursor: "pointer",
        }}
        href={link}
        rel="noopener noreferrer"
      >
        <span
          style={{
            fontSize: fontSize / 1.4 + "rem",
            whiteSpace: "pre",
            lineHeight: "100%",
          }}
        >
          {text}
        </span>
      </a>
    </div>
  );
}
