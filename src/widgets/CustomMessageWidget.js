import React, { Component } from "react";

export class CustomMessageWidget extends Component {

  render() {
    return (
      <div
        style={{
          color: this.props.foreground,
          fontSize: parseInt(this.props.message_size),
          fontFamily: this.props.font,
          padding: "1px 45px"
        }}
      >
        <span>{this.props.message}</span>
      </div>
    );
  }
}

export default CustomMessageWidget;
