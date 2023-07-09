import React from "react";

export class ErrorBoundadry extends React.Component {
  componentDidCatch() {
    // localStorage.clear();
    const current_error_count = parseInt(
      localStorage.getItem("error_count") || "0"
    );
    if (current_error_count < 4)
      localStorage.setItem("error_count", (current_error_count + 1).toString());
    else localStorage.clear();
  }

  render() {
    return this.props.children;
  }
}
