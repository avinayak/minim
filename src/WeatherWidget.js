import React, { Component } from "react";

let timer = null;
export class WeatherWidget extends Component {
  constructor() {
    super();
    if (!localStorage.getItem("temprature")) {
      localStorage.setItem("temprature", "_");
    }
    if (!localStorage.getItem("summary")) {
      localStorage.setItem("summary", "_");
    }

    this.state = {
      temprature: localStorage.getItem("temprature"),
      summary: localStorage.getItem("summary")
    };
  }

  componentWillUnmount() {
    clearInterval(timer);
  }

  componentDidMount() {
    timer = setInterval(() => {
      let weather_last_updated = parseInt(
        localStorage.getItem("weather_last_updated")
      );
      let time_now = Math.round(new Date().getTime() / 1000);
      let weather_update_freq = 20 * 60;
      if (weather_last_updated + weather_update_freq <= time_now) {
        this.getNewTemprature(
          JSON.parse(this.props.location).value,
          (temprature, summary) => {
            localStorage.setItem("temprature", temprature);
            localStorage.setItem("summary", summary);
            let time_now = Math.round(new Date().getTime() / 1000);
            localStorage.setItem("weather_last_updated", time_now);
            this.setState({ temprature, summary });
          }
        );
      }
    }, 1000);
  }

  getNewTemprature = (location, callback) => {
    var [lng, lat] = location.split(",");
    fetch(`https://weather-station.minim.workers.dev/?lat=${lat}&lng=${lng}`)
      .then(response => {
        console.log(response);
        return response.json();
      })
      .then(data => {
        // Work with JSON data here
        console.log(data);
        callback(
          parseFloat(data.currently.temperature),
          data.currently.summary
        );
      })
      .catch(err => {
        // Do something for an error here
        console.log(err);
      });
  };

  render() {
    var { temprature, summary } = this.state;

    if (this.props.temprature_unit === "C")
      temprature = Math.round(((parseFloat(temprature) - 32) * 5) / 9);
    else temprature = Math.round(temprature);
    if (isNaN(temprature)) temprature = "_";
    let weather = (
      <span>
        {temprature}&deg; {summary}
      </span>
    );
    
    let fontSize = Math.max( (123.33 - 3.333*summary.length),40);
    if (this.props.weather_format === "t") {
      fontSize = 120;
      weather = <span>{temprature}&deg;</span>;
    }

    return (
      <div
        style={{
          textAlign: "center",
          color: this.props.foreground,
          fontSize,
          fontFamily: this.props.font,
          padding: "1px 45px"
        }}
      >
        {weather}
      </div>
    );
  }
}

export default WeatherWidget;
