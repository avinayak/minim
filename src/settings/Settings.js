import React, { Component } from "react";
import {
  Row,
  Col,
  Form,
  Tabs,
  Tab
} from "react-bootstrap";

import Slider from "rc-slider";
import PlacesSelect from "./PlacesSelect";
import UnsplashSelect from "./UnsplashSelect";
import "rc-slider/assets/index.css";
import colors from "./settings/colors";

class Settings extends Component {
  render() {
    return (
      <React.Fragment>
        <Tabs>
          <Tab eventKey="background" title="Background">
            <br />
            <Form.Group
              onChange={(e) => {
                localStorage.setItem("background_mode", e.target.value);
                localStorage.setItem("color_index", 0);

                let tintv = e.target.value !== "image" ? 0.0 : 0.17;
                localStorage.setItem("tint_value", tintv);
                localStorage.setItem("tint", tintv);
                this.setState({
                  background_mode: e.target.value,
                  tint_value: tintv,
                  tint: tintv,
                  color_index: 0,
                });
              }}
            >
              <Form.Label>Background Mode</Form.Label>
              <Form.Control defaultValue={background_mode} as="select">
                <option value="flat">Flat</option>
                <option value="gradient">Gradient</option>
                <option value="image">Image</option>
              </Form.Control>
            </Form.Group>
            {(this.state.background_mode === "flat" ||
              this.state.background_mode === "gradient") && (
              <Form.Group
                onChange={(e) => {
                  localStorage.setItem("color_index", e.target.value);
                  this.setState({
                    color_index: parseInt(e.target.value),
                  });
                }}
              >
                <Form.Label>Color</Form.Label>
                <Form.Control
                  defaultValue={this.state.color_index + ""}
                  as="select"
                >
                  {colors[this.state.background_mode].map((c, i) => {
                    return <option value={i}>{c.name}</option>;
                  })}
                </Form.Control>
              </Form.Group>
            )}
            <div>
              {this.state.background_mode === "image" && (
                <div>
                  <Form.Group>
                    <Form.Label>Background Collection</Form.Label>

                    <UnsplashSelect
                      value={image_tags}
                      onChange={(value) => {
                        localStorage.setItem("image_tags", value);
                        this.setState({ image_tags: value });
                        this.refetchAndSetImage();
                      }}
                    />
                  </Form.Group>
                </div>
              )}
            </div>
            Tint
            <Slider
              value={this.state.tint * 100}
              step={1}
              onChange={(tint_value) => {
                localStorage.setItem("tint_value", tint_value / 100.0);
                this.setState({
                  tint: tint_value / 100.0,
                  tint_value: tint_value / 100.0,
                });
              }}
            />
            <br />
            <Form.Group
              onChange={(e) => {
                localStorage.setItem("font", e.target.value);
                this.setState({ font: e.target.value });
              }}
            >
              <Form.Label>Font</Form.Label>
              <Form.Control defaultValue={font} as="select">
                <option value="Circular">Circular</option>
                <option value="Futura">Futura</option>
                <option value="Product">Product</option>
                <option value="SharpGrotesk">Sharp Grotesk</option>
                <option value="BebasNeue">Bebas Neue</option>
              </Form.Control>
            </Form.Group>
            {this.state.background_mode === "image" && (
              <Form.Group
                onChange={(e) => {
                  localStorage.setItem("background_cycle", e.target.value);
                  this.setState({ background_cycle: e.target.value });
                }}
              >
                <Form.Label>Cycle Background</Form.Label>
                <Form.Control defaultValue={background_cycle} as="select">
                  <option value="never">Never</option>
                  <option value="tab">Every New Tab</option>
                  <option value="900">Every 15 Minutes</option>
                  <option value="3600">Every Hour</option>
                  <option value="86400">Every Day</option>
                </Form.Control>
              </Form.Group>
            )}
            <div className="modal-button-row">
              <Tooltipify message="Texture">
                <div className="toggle-button" onClick={this.toggleDots}>
                  &#xe3a5;
                </div>
              </Tooltipify>

              {background_mode === "image" && (
                <Tooltipify message="Invert">
                  <div className="toggle-button" onClick={this.invertColors}>
                    &#xe3ab;
                  </div>
                </Tooltipify>
              )}

              {background_mode === "image" && (
                <Tooltipify message="Change Background">
                  <div
                    className={`toggle-button ${`settings-button ${
                      !this.state.refresh_enabled && "not-allowed"
                    }`}`}
                    onClick={this.refetchAndSetImage}
                  >
                    <span
                      dangerouslySetInnerHTML={{
                        __html: this.state.refresh_enabled
                          ? "&#xe332;"
                          : "&#xe88b;",
                      }}
                    />
                  </div>
                </Tooltipify>
              )}

              {background_mode === "image" && (
                <Tooltipify message="Open Image">
                  <div className="toggle-button" onClick={this.openImage}>
                    &#xe89e;
                  </div>
                </Tooltipify>
              )}
            </div>
          </Tab>
          <Tab eventKey="widget" title="Widget">
            <br />
            <Form.Group
              onChange={(e) => {
                localStorage.setItem("widget", e.target.value);
                this.setState({ widget: e.target.value });
              }}
            >
              <Form.Label>Widget</Form.Label>
              <Form.Control defaultValue={widget} as="select">
                {Object.keys(widgets).map((wid) => (
                  <option key={wid} value={wid}>
                    {wid}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            {widget === "message" && (
              <div>
                <Row className="show-grid">
                  <Col md={12}>
                    <Form.Group
                      onChange={(e) => {
                        localStorage.setItem("message", e.target.value);
                        this.setState({ message: e.target.value });
                      }}
                    >
                      <Form.Label>Message</Form.Label>
                      <Form.Control
                        placeholder="Enter Message"
                        defaultValue={message}
                        as="textarea"
                        rows="3"
                      />
                    </Form.Group>
                  </Col>

                  <Col md={12}>
                    <Form.Group
                      onChange={(e) => {
                        localStorage.setItem("message_size", e.target.value);
                        this.setState({ message_size: e.target.value });
                      }}
                    >
                      <Form.Label>Message Size</Form.Label>
                      <Form.Control defaultValue={message_size} as="select">
                        {[...Array(20).keys()]
                          .filter((siz) => siz > 1)
                          .map((siz) => (
                            <option value={siz * 10}>{siz * 10}</option>
                          ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
              </div>
            )}

            {widget === "weather" && (
              <div>
                <Row className="show-grid">
                  <Col md={12}>
                    <Form.Group
                      onChange={(e) => {
                        localStorage.setItem("clock_border", e.target.value);
                        this.setState({ clock_border: e.target.value });
                      }}
                    >
                      <Form.Label>Location</Form.Label>
                      <PlacesSelect
                        location={location}
                        onChange={(location) => {
                          localStorage.setItem(
                            "location",
                            JSON.stringify(location)
                          );
                          this.setState({
                            location: JSON.stringify(location),
                          });
                        }}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={12}>
                    <Form.Group
                      onChange={(e) => {
                        localStorage.setItem("weather_format", e.target.value);
                        this.setState({
                          weather_format: e.target.value,
                        });
                      }}
                    >
                      <Form.Label>Weather Format</Form.Label>
                      <Form.Control defaultValue={weather_format} as="select">
                        <option value="t">Temprature</option>
                        <option value="ts">Temprature and Summary</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>

                  <Col md={12}>
                    <Form.Group
                      onChange={(e) => {
                        localStorage.setItem("temprature_unit", e.target.value);
                        this.setState({
                          temprature_unit: e.target.value,
                        });
                      }}
                    >
                      <Form.Label>Temprature Unit</Form.Label>
                      <Form.Control defaultValue={temprature_unit} as="select">
                        <option value="C">Celcius</option>
                        <option value="F">Farenheit</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
              </div>
            )}

            {widget === "clock" && (
              <div>
                <Row className="show-grid">
                  <Col md={12}>
                    <Form.Group
                      onChange={(e) => {
                        localStorage.setItem("clock_border", e.target.value);
                        this.setState({ clock_border: e.target.value });
                      }}
                    >
                      <Form.Label>Border Style</Form.Label>
                      <Form.Control defaultValue={clock_border} as="select">
                        <option value="none">none</option>
                        <option value="solid">solid</option>
                        <option value="rounded">rounded</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>

                  <Col md={12}>
                    <Form.Group
                      onChange={(e) => {
                        localStorage.setItem("clock_seperator", e.target.value);
                        this.setState({
                          clock_seperator: e.target.value,
                        });
                      }}
                    >
                      <Form.Label>Seperator</Form.Label>
                      <Form.Control defaultValue={clock_seperator} as="select">
                        <option value="colon">colon</option>
                        <option value="none">none</option>
                        <option value="space">space</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>

                  <Col md={12}>
                    <Form.Group
                      onChange={(e) => {
                        localStorage.setItem("clock_format", e.target.value);
                        this.setState({ clock_format: e.target.value });
                      }}
                    >
                      <Form.Label>Format</Form.Label>
                      <Form.Control defaultValue={clock_format} as="select">
                        <option value="24H">24 Hours</option>
                        <option value="12H">12 Hours</option>
                        <option value="12HAP">12 Hours with AM/PM</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
              </div>
            )}
          </Tab>
          <Tab eventKey="about" title="About">
            <center>
              <br />
              <img src="./icon128.png"></img>
              <br />
              Minim v2.1.4
              <br /> <br />
              <small>
                <b>
                  Designed by{" "}
                  <a href="https://twitter.com/atulvinayak">@atulvinayak</a>
                </b>
                <br />
                <br />
                Weather Data by <a href="https://darksky.net">Dark Sky</a>{" "}
                <br />
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
              </small>
            </center>
          </Tab>
        </Tabs>
      </React.Fragment>
    );
  }
}

export default Settings;
