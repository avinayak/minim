import React, { Component } from "react";
import AsyncSelect from "react-select/async";

const photonToSelect = data => {
  return data.features.map(x => {
    var coord = x.geometry.coordinates;
    var value = `${coord[0]},${coord[1]}`;
    var label = [
      x.properties.name,
      x.properties.street,
      x.properties.city,
      x.properties.state,
      x.properties.country
    ]
      .filter(x => x !== undefined)
      .join(", ");
    return { value, label };
  });
};

const loadOptions = (inputValue, callback) => {
  if (inputValue.length > 2) {
    fetch("http://photon.komoot.de/api/?q=" + inputValue + "&limit=5")
      .then(response => {
        return response.json();
      })
      .then(data => {
        // Work with JSON data here
        callback(photonToSelect(data));
      })
      .catch(err => {
        // Do something for an error here
      });
  } else {
    callback([]);
  }
};

export default class PlacesSelect extends Component {
  state = { inputValue: "" };

  handleInputChange = (newValue, actionMeta) => {
    console.log(actionMeta);
    if (actionMeta.action === "select-option") {
      localStorage.setItem("weather_last_updated", 0)
      this.props.onChange(newValue)
    } else {
      const inputValue = newValue;
      this.setState({ inputValue });
      return inputValue;
    }
  };
  render() {
    return (
      <div>
        <AsyncSelect
          cacheOptions
          loadOptions={loadOptions}
          defaultOptions
          value={JSON.parse(this.props.location)}
          onChange={this.handleInputChange}
        />
      </div>
    );
  }
}
