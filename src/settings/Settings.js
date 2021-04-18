import React, { Component } from "react";
import {
  Row,
  Col,
  Form,
  Tabs,
  Tab,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";

import colors from "./colors";
import AboutPage from "./AboutPage";
import BackgroundSettings from "./BackgroundSettings";
import MessageSettings from "./widgets/MessageSettings";
import ClockSettings from "./widgets/ClockSettings";
import WeatherSettings from "./widgets/WeatherSettings";

class Settings extends Component {
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
                    {wid}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            {s.widget === "clock" && (
              <ClockSettings setStore={setStore} s={s} />
            )}

            {s.widget === "weather" && (
              <WeatherSettings setStore={setStore} s={s} />
            )}

            {s.widget === "message" && (
              <MessageSettings setStore={setStore} s={s} />
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
