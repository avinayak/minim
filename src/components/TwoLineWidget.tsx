type TwoLineWidgetProps = {
  text: string;
  subText?: string;
  fontSize: number;
};

export function TwoLineWidget({ text, subText, fontSize }: TwoLineWidgetProps) {
  return (
    <div>
      <span
        style={{
          fontSize: fontSize / 1.4 + "rem",
          whiteSpace: "pre",
          lineHeight: "100%",
        }}
      >
        {text}
      </span>
      <br />
      <span style={{ fontSize: fontSize * 5 + "px" }}>{subText}</span>
    </div>
  );
}
