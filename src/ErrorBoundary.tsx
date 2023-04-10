import React from "react";

export class ErrorBoundadry extends React.Component {
  componentDidCatch() {
    localStorage.clear();
    // reload the page
    // window.location.reload();
  }

  render() {
    return this.props.children;
  }
}
