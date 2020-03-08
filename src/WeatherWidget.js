import React, { Component } from "react";

let timer = null;
export class WeatherWidget extends Component {
  constructor() {
    super();
    if (!localStorage.getItem("temprature")) {
      localStorage.setItem("temprature", "_");
    }

    this.state = {
      temprature: localStorage.getItem("temprature")
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
          temprature => {
            localStorage.setItem("temprature", temprature);
            let time_now = Math.round(new Date().getTime() / 1000);
            localStorage.setItem("weather_last_updated", time_now);
            this.setState({ temprature });
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
        callback(parseFloat(data.currently.temperature));
      })
      .catch(err => {
        // Do something for an error here
        console.log(err);
      });
  };

  render() {
    var temprature = this.state.temprature;

    if (this.props.temprature_unit === "C")
      temprature = Math.round(((parseFloat(temprature) - 32) * 5) / 9);
    else temprature = Math.round(temprature);
    if(isNaN(temprature))
      temprature = "_"
    return (
      <div
        style={{
          textAlign: "center",
          color: this.props.foreground,
          fontSize: 120,
          fontFamily: this.props.font,
          padding: "1px 45px"
        }}
      >
        <span>{temprature}&deg;</span>
      </div>
    );
  }
}

export default WeatherWidget;
