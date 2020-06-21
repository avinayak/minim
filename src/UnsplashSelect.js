import React, { Component } from "react";

import CreatableSelect from "react-select/creatable";

const presets = [
  { value: "collection:3330448", label: "Nature" },
  { value: "collection:1065976", label: "Wallpapers" },
  { value: "collection:3330445", label: "Textures & Patterns" },
  { value: "collection:9510092", label: "Experimental" },
  { value: "collection:17098", label: "Floral Beauty" },
  { value: "collection:9270463", label: "Lush Life" },
  { value: "collection:3348849", label: "Architecture" },
  { value: "collection:9670693", label: "Aurora" }
];

export default class UnsplashSelect extends Component {
  constructor() {
    super();
    this.state = {
      collections2: JSON.parse(localStorage.getItem("collections2"))
    };
  }
  handleChange = (newValue, actionMeta) => {
    if (actionMeta.action === "select-option") {
      this.props.onChange(newValue.value);
    } else if (actionMeta.action === "clear") {
      var deleted = this.state.collections2.filter(
        x => x.value === this.props.value
      )[0];
      if (deleted.isnew) {
        var nc = this.state.collections2.filter(
          x => x.value !== this.props.value
        );
        this.setState({
          collections2: nc
        });
        localStorage.setItem("collections2", JSON.stringify(nc));
        this.props.onChange(presets[0].value);
      } else {
        alert("Cannot delete a preset collelction");
      }
    } else if (actionMeta.action === "create-option") {
      var value = newValue.value.split(" ")[0];
      var label = newValue.value.substring(value.length).trim();
      if (value.indexOf(":") === -1) {
        value = label = newValue.value;
      }
      if (!label) label = value;

      var newcoll = [
        ...this.state.collections2,
        {
          label,
          value,
          isnew: true
        }
      ];
      this.setState({
        collections2: newcoll
      });
      localStorage.setItem("collections2", JSON.stringify(newcoll));
      this.props.onChange(value);
    }
    console.groupEnd();
  };

  render() {
    let { collections2 } = this.state;
    collections2 = collections2.concat(presets)
    return (
      <CreatableSelect
        isClearable
        value={
          collections2.filter(option => option.value === this.props.value)[0]
        }
        onChange={this.handleChange}
        options={collections2}
      />
    );
  }
}
