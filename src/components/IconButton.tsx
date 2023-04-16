import {Icon} from "@mdi/react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

export function IconButton({ icon, tooltip,on, ...props }) {
  const renderTooltip = (props) => (
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
        <Icon path={icon} size={1.2} color={
          on? 'black': '#ccc'
        } />
      </button>
    </OverlayTrigger>
  );
}
