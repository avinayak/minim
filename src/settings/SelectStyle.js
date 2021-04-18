import React, { Component } from "react";

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    padding: "0px 24px",
  }),
  control: (provided, state) => ({
    ...provided,
    background: "#f7f7f9",
    borderRadius: 0,
    border: "none",
    padding: "4px 0px 4px 17px",
  }),
  menu: (provided) => ({
    ...provided,
    border: "1px solid",
    borderRadius: 0,
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: "#55595c",
    width: "31px",
    marginRight: "-6px",
  }),

  clearIndicator: (provided, state) => ({
    ...provided,
    display: "none",
  }),

  indicatorSeparator: (provided, state) => ({
    ...provided,
    display: "none",
  }),
};

export { customStyles };