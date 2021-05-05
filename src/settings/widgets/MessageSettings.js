import React, { Component } from "react";
import {
  Row,
  Col,
  Form
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
        </Row>
      </div>
    );
  }
}

export default MessageSettings;
