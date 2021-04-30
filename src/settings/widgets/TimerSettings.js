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
import DateTimePicker from "react-datetime-picker";

class TimerSettings extends Component {
  render() {
    let { setStore, s } = this.props;
    return (
      <div>
        <Row className="show-grid">
          <Col md={12}>
            <Form.Group
              onChange={(e) => {
                setStore("timer_pre_text", e.target.value);
              }}
            >
              <Form.Label>Text Before</Form.Label>
              <Form.Control
                placeholder="Enter Message"
                defaultValue={s.timer_pre_text}
                as="textarea"
                rows="1"
              />
            </Form.Group>
          </Col>

          <Col md={12}>
            <Form.Label>Target Time</Form.Label>
            <div className="datepicker">
              <DateTimePicker
                onChange={(e) => {
                  setStore("timer_time", e);
                }}
                calendarIcon={null}
                clearIcon={null}
                value={new Date(s.timer_time)}
              />
            </div>
          </Col>

          <Col md={12}>
            <Form.Group
              onChange={(e) => {
                setStore("timer_post_text", e.target.value);
              }}
            >
              <Form.Label>Text After</Form.Label>
              <Form.Control
                placeholder="Enter Message"
                defaultValue={s.timer_post_text}
                as="textarea"
                rows="1"
              />
            </Form.Group>
          </Col>
          <Col md={12}>
            <Form.Group
              onChange={(e) => {
                setStore("timer_format", e.target.value);
              }}
            >
              <Form.Label>Format</Form.Label>
              <Form.Control defaultValue={s.timer_format} as="select">
                {/* <option value="sa">Seconds (Accurate)</option>
                <option value="ma">Minutes (Accurate)</option>
                <option value="ha">Hours (Accurate)</option>
                <option value="da">Days (Accurate)</option>
                <option value="ya">Years (Accurate)</option> */}
                {/* <option value="s">Seconds</option> */}
                <option value="m">Minutes</option>
                <option value="h">Hours</option>
                <option value="d">Days</option>
                <option value="y">Years</option>
                <option value="t">Human Friendly</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
      </div>
    );
  }
}

export default TimerSettings;
