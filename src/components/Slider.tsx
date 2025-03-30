import Slider from "rc-slider";
import "rc-slider/assets/index.css";

export function LabelledSlider({ label, onChange, currentValue, ...props }) {
  return (
    <div className="labelled-form-element">
      <span style={{userSelect: "none"}}>{label}</span>
      <Slider
        value={currentValue}
        onChange={(newValue) => {
          onChange(newValue);
        }}
        {...props}
      />
    </div>
  );
}
