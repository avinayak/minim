import { Form } from "react-bootstrap";

export function LabelledTextInput({ label, helpText, onChange, ...props }) {
  return (
    <>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type="text"
        onChange={(e) => {
          onChange(e.target.value);
        }}
        {...props}
      />
      {helpText && <Form.Text muted>{helpText}</Form.Text>}
      <br />
    </>
  );
}
