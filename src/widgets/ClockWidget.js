import React, { Component } from "react";
const seperators = {
  colon: ":",
  space: " ",
  none: ""
};

let timer = null;
export class ClockWidget extends Component {
  constructor() {
    super();
    this.state = {
      timeString: this.getTime(localStorage.getItem("clock_seperator"), localStorage.getItem("clock_format")),
      ap: this.getAP()
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
        )
      });
    }, 1000);
  }

  getAP = () => {
    var date = new Date();
    var hours = date.getHours();
    return hours >= 12 ? "P" : "A";
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
    return (
      <div
        style={{
          textAlign: "center",
          color: this.props.foreground,
          fontSize: 120,
          fontFamily: this.props.font,
          padding: "1px 45px",
          border: `${
            this.props.clock_border==="rounded"
              ? "solid"
              : this.props.clock_border
          } 10px`,
          borderRadius: this.props.clock_border==="rounded" ? 30 : 0
        }}
      >
        <span>
          {this.state.timeString}
          <span>
            {this.props.clock_format==="12HAP" && (
              <sup className="ampm">{this.state.ap}</sup>
            )}
          </span>
        </span>
      </div>
    );
  }
}

export default ClockWidget;
