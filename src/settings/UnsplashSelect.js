import React, { Component } from "react";

import CreatableSelect from "react-select/creatable";
import { customStyles } from "./SelectStyle";

const presets = [
  { value: "likes:atulvi", label: "Curated by Minim", isnew: false },
  { value: "collection:3330448", label: "Nature", isnew: false },
  { value: "collection:1065976", label: "Wallpapers", isnew: false },
  { value: "collection:3330445", label: "Textures & Patterns", isnew: false },
  { value: "collection:9510092", label: "Experimental", isnew: false },
  { value: "collection:17098", label: "Floral Beauty", isnew: false },
  { value: "collection:4694315", label: "Film", isnew: false },
  { value: "collection:9270463", label: "Lush Life", isnew: false },
  { value: "collection:3348849", label: "Architecture", isnew: false },
  { value: "collection:9670693", label: "Aurora", isnew: false },
];

export default class UnsplashSelect extends Component {
  constructor() {
    super();
    this.state = {
      collections2: JSON.parse(localStorage.getItem("collections2")),
    };
  }
  handleChange = (newValue, actionMeta) => {
    if (actionMeta.action === "select-option") {
      this.props.onChange(newValue.value);
    } else if (actionMeta.action === "clear") {
      var deleted = this.state.collections2.filter(
        (x) => x.value === this.props.value
      )[0];
      if (deleted && deleted.isnew) {
        var nc = this.state.collections2.filter(
          (x) => x.value !== this.props.value
        );
        this.setState({
          collections2: nc,
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
          isnew: true,
        },
      ];
      this.setState({
        collections2: newcoll,
      });
      localStorage.setItem("collections2", JSON.stringify(newcoll));
      this.props.onChange(value);
    }
    console.groupEnd();
  };

  render() {
    let { collections2 } = this.state;
    collections2 = collections2.concat(presets);
    return (
      <CreatableSelect
        isClearable
        value={
          collections2.filter((option) => option.value === this.props.value)[0]
        }
        onChange={this.handleChange}
        options={collections2}
        styles={customStyles}
      />
    );
  }
}
