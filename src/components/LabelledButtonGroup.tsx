import { FormLabel } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

export function LabelledButtonGroup({
  label,
  buttonStates,
  onClick,
  selectedState,
}: {
  label: string;
  buttonStates: string[];
  onClick: (state: string) => void;
  selectedState: string;
}) {
  return (
    <div className="labelled-form-element">
      <FormLabel style={{userSelect: "none"}}>{label}</FormLabel>
      <br />
      <ButtonGroup aria-label="Basic example">
        {buttonStates.map((state) => (
          <Button
            onClick={() => {
              onClick(state);
            }}
            variant={state === selectedState ? "primary" : "outline-primary"}
          >
            {state}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
}
