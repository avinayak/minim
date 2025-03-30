import { Form, FormLabel } from "react-bootstrap";

export function LabelledSelector({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { label: string; value: string }[]
  onChange: (value: string) => void;
}) {
  return (
    <div className="labelled-selector">
      <FormLabel style={{userSelect: "none"}}>{label}</FormLabel>
      <Form.Select
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      >
        {options.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </Form.Select>
      <br />
    </div>
  );
}
