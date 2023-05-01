import { Icon } from "@mdi/react";
import { OverlayTrigger, Tooltip, TooltipProps } from "react-bootstrap";

export function IconButton({
  icon,
  tooltip,
  on,
  ...props
}: {
  icon: string;
  tooltip: string;
  on: boolean;
}) {
  const renderTooltip = (props: TooltipProps) => (
    <Tooltip id="bottom-button-tooltip" {...props}>
      {tooltip}
    </Tooltip>
  );

  return (
    <OverlayTrigger
      placement="bottom"
      delay={{ show: 0, hide: 1 }}
      overlay={renderTooltip}
    >
      <button className="icon-button" {...props}>
        <Icon path={icon} size={1.2} color={on ? "black" : "#ccc"} />
      </button>
    </OverlayTrigger>
  );
}
