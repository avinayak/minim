import React, { Component } from "react";

export class CustomMessageWidget extends Component {
  render() {
    return (
      <div
        style={{
          color: this.props.foreground,
          fontSize: parseInt(this.props.widget_font_size) * 4 + 20,
          fontFamily: this.props.font,
        }}
        
      >
        <span style={{whiteSpace:"break-spaces" }}>{this.props.message}</span>
        {/* <span dangerouslySetInnerHTML={{__html: this.props.message}} ></span> */}
      </div>
    );
  }
}

export default CustomMessageWidget;
