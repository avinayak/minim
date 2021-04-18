import React, { Component } from "react";
import "./App.css";
import "./bootstrap.min.css";
import Ikigai from "./Ikigai";

class App extends Component {

  componentDidCatch(error, errorInfo) {
    localStorage.clear()
  }

  render() {
    return (
      <div className="App">
        <Ikigai />
      </div>
    );
  }
}

export default App;
