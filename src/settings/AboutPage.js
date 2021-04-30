import React, { Component } from "react";
import Button from "react-bootstrap/Button";

class AboutPage extends Component {
  render() {
    return (
      <div>
        <center>
          <br />
          <img src="./icon128.png"></img>
          <br />
          Minim v2.2.0
          <br />
          
          <br />
          <small>
            <b>
              Designed by{" "}
              <a href="https://twitter.com/atulvinayak">@atulvinayak</a>
            </b>
            <br />
            <br />
            Weather Data by <a href="https://darksky.net">Dark Sky</a> <br />
            Backgrounds from <a href="https://unsplash.com">Unslpash</a>
            <br />
            <br />
            <br />
            <a href="https://ko-fi.com/S6S51GBT3" target="_blank">
              <img
                height="36"
                style={{ border: "0px", height: "36px" }}
                src="https://az743702.vo.msecnd.net/cdn/kofi2.png?v=2"
                border="0"
                alt="Buy Me a Coffee at ko-fi.com"
              />
            </a>
            <br />
            <br />
            <br />
            <a
            className="ee"
            target="_blank"
            href="https://nkanaev.com/zen101/en/077/"
          >
            (꒡ꜙ꒡)
          </a>
          </small>
        </center>
      </div>
    );
  }
}

export default AboutPage;
