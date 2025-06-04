import { LabelledSelector } from "../components/LabelledSelector";
import { TwoLineWidget } from "../components/TwoLineWidget";
import { WidgetType } from "../types";
import { useGridLayoutDispatch } from "./GridLayoutContext";
import { getCurrentMicroseason } from "../data/japaneseMicroseasons";

export type MicroseasonDisplayMode =
  | "english_english" // English / English
  | "japanese_japanese" // Japanese / Japanese
  | "japanese_english" // Japanese (English) / Japanese (English)
  | "mixed"; // Japanese / English

export const japaneseMicroseasonsWidget: WidgetType = {
  widgetCode: "japaneseMicroseasons",
  widgetName: "Microseason",
  initialState: () => ({
    widgetCode: "japaneseMicroseasons",
    fontSize: 2,
    borderStyle: "none",
    subText: "",
    displayMode: "english_english" as MicroseasonDisplayMode,
  }),
  settingsForm: (widget) => {
    const dispatch = useGridLayoutDispatch();

    return (
      <>
       
        <p>
          <a href="https://www.nippon.com/en/features/h00124/">Japanese microseasons</a> are a traditional way of dividing the year into
          24 segments, each lasting about 15 days. They reflect seasonal changes
          and cultural significance in Japan.
        </p>
        <hr/>
        <LabelledSelector
          label="Display Mode"
          options={[
            { label: "English / English", value: "english_english" },
            { label: "Japanese / Japanese", value: "japanese_japanese" },
            {
              label: "Japanese English / Japanese English",
              value: "japanese_english",
            },
            { label: "Japanese / English", value: "mixed" },
          ]}
          value={widget.displayMode}
          onChange={(displayMode) => {
            dispatch({
              type: "UPDATE_WIDGET",
              payload: {
                ...widget,
                displayMode: displayMode as MicroseasonDisplayMode,
              },
            });
          }}
        />
      </>
    );
  },
  renderWidget: (widget) => {
    const currentMicroseason = getCurrentMicroseason();

    if (!currentMicroseason) {
      return (
        <TwoLineWidget
          text="No microseason data"
          fontSize={widget.fontSize}
        />
      );
    }

    let mainText = "";

    switch (widget.displayMode) {
      case "english_english":
        mainText = `${currentMicroseason.sekki.english} - ${currentMicroseason.ko.english}`;
        break;
      case "japanese_japanese":
        mainText = `${currentMicroseason.sekki.japanese} - ${currentMicroseason.ko.japanese}`;
        break;
      case "japanese_english":
        mainText = `${currentMicroseason.sekki.japanese} ${currentMicroseason.sekki.english} - ${currentMicroseason.ko.japanese} ${currentMicroseason.ko.english}`;
        break;
      case "mixed":
        mainText = `${currentMicroseason.sekki.japanese} ${currentMicroseason.ko.english}`;
        break;
      default:
        mainText = `${currentMicroseason.sekki.english} - ${currentMicroseason.ko.english}`;
    }

    return (
      <TwoLineWidget
        text={mainText}
        fontSize={widget.fontSize}
      />
    );
  },
  preview: () => (
    <div>
      <div style={{ fontSize: "18px" }}>Beginning of Spring</div>
    </div>
  ),
};
