import {Icon} from "@mdi/react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

export function BottomBarButton({ icon, tooltip, ...props }) {
  const renderTooltip = (props) => (
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
        <Icon path={icon} color="white" size={1.} />
      </button>
    </OverlayTrigger>
  );
}
