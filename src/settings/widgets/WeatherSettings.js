import React, { Component } from "react";
import {
  Row,
  Col,
  Form
} from "react-bootstrap";

import PlacesSelect from "../PlacesSelect";
class WeatherSettings extends Component {
  render() {
    let { setStore, s } = this.props;
    return (
      <div>
        <Row className="show-grid">
          <Col md={12}>
            <Form.Group
              onChange={(e) => {
                setStore("clock_border", e.target.value);
              }}
            >
              <Form.Label>Location</Form.Label>
              <PlacesSelect
                location={s.location}
                onChange={(location) => {
                  setStore("location", JSON.stringify(location));
                }}
              />
            </Form.Group>
          </Col>

          <Col md={12}>
            <Form.Group
              onChange={(e) => {
                setStore("weather_format", e.target.value);
              }}
            >
              <Form.Label>Weather Format</Form.Label>
              <Form.Control defaultValue={s.weather_format} as="select">
                <option value="t">Temprature</option>
                <option value="ts">Temprature and Summary</option>
              </Form.Control>
            </Form.Group>
          </Col>

          <Col md={12}>
            <Form.Group
              onChange={(e) => {
                setStore("temprature_unit", e.target.value);
              }}
            >
              <Form.Label>Temprature Unit</Form.Label>
              <Form.Control defaultValue={s.temprature_unit} as="select">
                <option value="C">Celsius</option>
                <option value="F">Farenheit</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
      </div>
    );
  }
}

export default WeatherSettings;
