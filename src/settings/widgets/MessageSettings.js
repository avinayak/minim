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

class MessageSettings extends Component {
  render() {
    let { setStore, s } = this.props;
    return (
      <div>
        <Row className="show-grid">
          <Col md={12}>
            <Form.Group
              onChange={(e) => {
                setStore("message", e.target.value);
              }}
            >
              <Form.Label>Message</Form.Label>
              <Form.Control
                placeholder="Enter Message"
                defaultValue={s.message}
                as="textarea"
                rows="3"
              />
            </Form.Group>
          </Col>

          <Col md={12}>
            <Form.Group
              onChange={(e) => {
                setStore("message_size", e.target.value);
              }}
            >
              <Form.Label>Message Size</Form.Label>
              <Form.Control defaultValue={s.message_size} as="select">
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
    );
  }
}

export default MessageSettings;
