import { Icon } from "@mdi/react";
import { OverlayTrigger, Tooltip, TooltipProps } from "react-bootstrap";

export function BottomBarButton({
  icon,
  tooltip,
  ...props
}: {
  icon: string;
  tooltip: string;
}) {
  const renderTooltip = (props: TooltipProps) => (
    <Tooltip id="bottom-button-tooltip" {...props}>
      {tooltip}
    </Tooltip>
  );

  return (
    <OverlayTrigger
      placement="top"
      delay={{ show: 0, hide: 1 }}
      overlay={renderTooltip}
    >
      <button className="icon-button" {...props}>
        <Icon path={icon} color="white" size={1} />
      </button>
    </OverlayTrigger>
  );
}
