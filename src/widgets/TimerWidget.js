import React, { Component } from "react";

function numberEnding(number) {
  return number > 1 ? "s" : "";
}

function millisecondsToStr(milliseconds) {
  // TIP: to find current time in milliseconds, use:
  // var  current_time_milliseconds = new Date().getTime();

  var temp = Math.floor(milliseconds / 1000);
  var years = Math.floor(temp / 31536000);
  if (years) {
    return years + " year" + numberEnding(years);
  }
  //TODO: Months! Maybe weeks?
  var days = Math.floor((temp %= 31536000) / 86400);
  if (days) {
    return days + " day" + numberEnding(days);
  }
  var hours = Math.floor((temp %= 86400) / 3600);
  if (hours) {
    return hours + " hour" + numberEnding(hours);
  }
  var minutes = Math.floor((temp %= 3600) / 60);
  if (minutes) {
    return minutes + " minute" + numberEnding(minutes);
  }
}

function millisecondsToStrComplete(milliseconds) {
  var seconds = Math.floor(milliseconds / 1000);
  var minutes = Math.floor(seconds / 60);
  var hours = Math.floor(minutes / 60);
  var days = Math.floor(hours / 24);
  var years = Math.floor(days / 365);

  days = days - years * 365;
  hours = hours - days * 24 - years * 365 * 24 ;
  minutes = minutes - days * 24 * 60 - hours * 60 - years * 365 * 24 * 60;
  seconds = seconds - days * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60 - years * 365 * 24 * 60 * 60;
  var timeStr = "";
  if (years) timeStr += `${years} year${numberEnding(years)} `;
  if (days) timeStr += `${days} day${numberEnding(days)} `;
  if (hours) timeStr += `${hours} hour${numberEnding(hours)} `;
  if (minutes) timeStr += `${minutes} minute${numberEnding(minutes)}`;
  return timeStr;
}

export class TimerWidget extends Component {
  constructor() {
    super();
    this.state = {
      clock: localStorage.getItem("__cached_timer_out"),
    };
  }

  componentWillMount() {
    setInterval(() => {
      const date1 = new Date(this.props.timer_time);
      const date2 = new Date();
      const diffTime = Math.abs(date2 - date1);
      var diffOut = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365));

      //   if (this.props.timer_format === "s") {
      //     diffOut = Math.floor(diffTime / 1000);
      //   } else

      if (this.props.timer_format === "m") {
        diffOut = Math.floor(diffTime / (1000 * 60));
      } else if (this.props.timer_format === "h") {
        diffOut = Math.floor(diffTime / (1000 * 60 * 60));
      } else if (this.props.timer_format === "d") {
        diffOut = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      } else if (this.props.timer_format === "y") {
        diffOut = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365));
      } else if (this.props.timer_format === "t") {
        diffOut = millisecondsToStr(diffTime);
      }else if (this.props.timer_format === "tc") {
        diffOut = millisecondsToStrComplete(diffTime);
      }

      //   else if (this.props.timer_format === "sa") {
      //     diffOut = (diffTime / 1000).toFixed(6);
      //   } else if (this.props.timer_format === "ma") {
      //     diffOut = (diffTime / (1000 * 60)).toFixed(6);
      //   } else if (this.props.timer_format === "ha") {
      //     diffOut = (diffTime / (1000 * 60 * 60)).toFixed(6);
      //   } else if (this.props.timer_format == "da") {
      //     diffOut = (diffTime / (1000 * 60 * 60 * 24)).toFixed(6);
      //   } else if (this.props.timer_format == "ya") {
      //     diffOut = (diffTime / (1000 * 60 * 60 * 24 * 365)).toFixed(8);
      //   }
      localStorage.setItem("__cached_timer_out", diffOut);
      this.setState({ clock: diffOut });
    }, 1000);
  }

  render() {
    let font_size = parseInt(this.props.widget_font_size) * 4 + 20;
    return (
      <div
        style={{
          color: this.props.foreground,
          fontSize: font_size,
          fontFamily: this.props.font,
        }}
      >
        <span style={{ whiteSpace: "break-spaces" }}>
          {this.props.timer_pre_text}
        </span>
        {/* <div
          style={{
            display: "inline-block",
            width: font_size * this.state.clock.toString().length * 0.62,
          }}
        >
          {this.state.clock}
        </div> */}
        <span>{this.state.clock}</span>
        <span style={{ whiteSpace: "break-spaces" }}>
          {this.props.timer_post_text}
        </span>
        {/* <span dangerouslySetInnerHTML={{__html: this.props.message}} ></span> */}
      </div>
    );
  }
}

export default TimerWidget;
