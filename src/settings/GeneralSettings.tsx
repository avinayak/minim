import Button from "react-bootstrap/Button";
import { WidgetPropertiesType } from "../types";
import { useGridLayoutDispatch } from "../widgets/GridLayoutContext";
import { LabelledSlider } from "../components/Slider";

export function GeneralSettings({ widget }: { widget: WidgetPropertiesType }) {
  const dispatch = useGridLayoutDispatch();
  const { fontSize } = widget;

  return (
    <div>
      <LabelledSlider
        label="Size"
        min={2}
        max={24}
        onChange={(widget_font_size) => {
          dispatch({
            type: "UPDATE_WIDGET",
            payload: { ...widget, fontSize: widget_font_size },
          });
        }}
        currentValue={fontSize}
      />

      <Button
        variant="danger"
        onClick={() => {
          dispatch({
            type: "DELETE_WIDGET",
            payload: widget.id,
          });
        }}
      >
        Delete
      </Button>
    </div>
  );
}
