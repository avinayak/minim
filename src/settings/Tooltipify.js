import React, { Component } from "react";
import { OverlayTrigger,Tooltip } from "react-bootstrap";

const Tooltipify = ({ message, children }) => {
  return (
    <OverlayTrigger
      placement={"top"}
      overlay={<Tooltip id={`tooltipiii`}>{message}</Tooltip>}
    >
      {children}
    </OverlayTrigger>
  );
};

export default Tooltipify;