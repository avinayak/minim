import React, { Component } from "react";

import CreatableSelect from "react-select/creatable";

export default class UnsplashSelect extends Component {
  constructor() {
    super();
    this.state = {
      collections: JSON.parse(localStorage.getItem("collections"))
    };
  }
  handleChange = (newValue, actionMeta) => {
    if (actionMeta.action === "select-option") {
      this.props.onChange(newValue.value);
    } else if (actionMeta.action === "clear") {
      var deleted = this.state.collections.filter(
        x => x.value === this.props.value
      )[0];
      if (deleted.isnew) {
        var nc = this.state.collections.filter(
          x => x.value !== this.props.value
        );
        this.setState({
          collections: nc
        });
        localStorage.setItem("collections",  JSON.stringify(nc));
        this.props.onChange(nc[0].value);
      } else {
        alert("Cannot delete a preset collelction");
      }
    } else if (actionMeta.action === "create-option") {
      var value = newValue.value.split(" ")[0];
      var label = newValue.value.substring(value.length).trim();
      if (value.indexOf(":")===-1) {
        value = label = newValue.value;
      }
      if (!label) label = value;

      var newcoll = [
        ...this.state.collections,
        {
          label,
          value,
          isnew: true
        }
      ];
      this.setState({
        collections: newcoll
      });
      localStorage.setItem("collections", JSON.stringify(newcoll));
      this.props.onChange(value);
    }
    console.groupEnd();
  };

  render() {
    let { collections } = this.state;
    return (
      <CreatableSelect
        isClearable
        value={
          collections.filter(option => option.value === this.props.value)[0]
        }
        onChange={this.handleChange}
        options={collections}
      />
    );
  }
}
