import React, { Component } from "react";
const seperators = {
  colon: ":",
  newline: "\n",
  space: " ",
  none: "",
};

let timer = null;
export class ClockWidget extends Component {
  constructor() {
    super();
    this.state = {
      timeString: this.getTime(
        localStorage.getItem("clock_seperator"),
        localStorage.getItem("clock_format")
      ),
      ap: this.getAP(),
    };
  }

  componentWillUnmount() {
    clearInterval(timer);
  }

  componentDidMount() {
    timer = setInterval(() => {
      this.setState({
        ap: this.getAP(),
        timeString: this.getTime(
          this.props.clock_seperator,
          this.props.clock_format
        ),
      });
    }, 1000);
  }

  getAP = () => {
    var date = new Date();
    var hours = date.getHours();
    return hours >= 12 ? "PM" : "AM";
  };

  getTime = (seperator, clock_format) => {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();

    if (clock_format !== "24H") {
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
    }

    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;
    var strTime = hours + seperators[seperator] + minutes;
    localStorage.setItem("time", strTime);
    return strTime;
  };

  render() {
    let font_size = parseInt(this.props.widget_font_size);
    let borderWidth = (20 + font_size) * 0.25;
    let padding = (20 + font_size) * 0.7;
    let round = (20 + font_size) * 0.7;
    return (
      <div
        style={{
          color: this.props.foreground,
          whiteSpace: "break-spaces",
          lineHeight: `${font_size * 4 + 40}px`,
          letterSpacing: "4px",
          fontSize: font_size * 4 + 40,
          fontFamily: this.props.font,
          padding: `16px ${padding}px`,
          border: `${
            this.props.clock_border === "rounded"
              ? "solid"
              : this.props.clock_border
          } ${borderWidth}px`,
          borderRadius: this.props.clock_border === "rounded" ? round : 0,
        }}
      >
        <span>
          {`${this.state.timeString}${
            this.props.clock_seperator === "newline" ? "\n" : ""
          }`}
        </span>
        <span>
          {this.props.clock_format === "12HAP"
            ? (this.props.clock_seperator === "newline" ? "" : " ") +
              this.state.ap
            : ""}
        </span>
      </div>
    );
  }
}

export default ClockWidget;
