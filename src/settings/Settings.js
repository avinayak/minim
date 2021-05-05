import React, { Component } from "react";
import {
  Form,
  Tabs,
  Tab,
} from "react-bootstrap";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import AboutPage from "./AboutPage";
import BackgroundSettings from "./BackgroundSettings";
import MessageSettings from "./widgets/MessageSettings";
import TimerSettings from "./widgets/TimerSettings";
import ClockSettings from "./widgets/ClockSettings";
import WeatherSettings from "./widgets/WeatherSettings";

class Settings extends Component {
  capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };
  render() {
    let { setStore, s, refetchAndSetImage, widgetNames } = this.props;
    return (
      <React.Fragment>
        <Tabs>
          <Tab eventKey="background" title="Background">
            <BackgroundSettings
              setStore={setStore}
              s={s}
              refetchAndSetImage={refetchAndSetImage}
            />
          </Tab>

          <Tab eventKey="widget" title="Widget">
            <br />
            <Form.Group
              onChange={(e) => {
                setStore("widget", e.target.value);
              }}
            >
              <Form.Label>Widget</Form.Label>
              <Form.Control defaultValue={s.widget} as="select">
                {widgetNames.map((wid) => (
                  <option key={wid} value={wid}>
                    {this.capitalize(wid)}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            {s.widget !== "nothing" && (
              <React.Fragment>
                <Form.Group
                  onChange={(e) => {
                    setStore("font", e.target.value);
                  }}
                >
                  <Form.Label>Font</Form.Label>
                  <Form.Control defaultValue={s.font} as="select">
                    <option value="Product">Product</option>
                    <option value="Circular">Jakarta Sans</option>
                    <option value="Futura">Renner</option>
                    <option value="CardoRegular">Cardo</option>
                    <option value="CardoItalic">Cardo Italics</option>
                    <option value="system-ui">System UI</option>
                  </Form.Control>
                </Form.Group>
                <Form.Label>Widget Position</Form.Label>
                <div className="half-select-box">
                  <Form.Group
                    className="half-select"
                    onChange={(e) => {
                      setStore("widget_x", e.target.value);
                    }}
                  >
                    <Form.Control defaultValue={s.widget_x} as="select">
                      <option value="left">Left</option>
                      <option value="center">Center</option>
                      <option value="right">Right</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group
                    className="half-select"
                    onChange={(e) => {
                      setStore("widget_y", e.target.value);
                    }}
                  >
                    <Form.Control defaultValue={s.widget_y} as="select">
                      <option value="top">Top</option>
                      <option value="center">Center</option>
                      <option value="bottom">Bottom</option>
                    </Form.Control>
                  </Form.Group>
                </div>
                Font Size
                <br />
                <Slider
                  value={s.widget_font_size}
                  step={1}
                  onChange={(widget_font_size) => {
                    setStore("widget_font_size", widget_font_size);
                  }}
                />
                <hr />
              </React.Fragment>
            )}
            {s.widget === "clock" && (
              <ClockSettings setStore={setStore} s={s} />
            )}
            {s.widget === "weather" && (
              <WeatherSettings setStore={setStore} s={s} />
            )}
            {s.widget === "message" && (
              <MessageSettings setStore={setStore} s={s} />
            )}
            {s.widget === "timer" && (
              <TimerSettings setStore={setStore} s={s} />
            )}
          </Tab>

          <Tab eventKey="about" title="About">
            <AboutPage />
          </Tab>
        </Tabs>
      </React.Fragment>
    );
  }
}

export default Settings;
