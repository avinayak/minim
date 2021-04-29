import React, { Component } from "react";
import { Form } from "react-bootstrap";
import colors from "./colors";
import Slider from "rc-slider";
import Tooltipify from "./Tooltipify";
import UnsplashSelect from "./UnsplashSelect";
import "rc-slider/assets/index.css";

class BackgroundSettings extends Component {
  render() {
    let { setStore, s, refetchAndSetImage } = this.props;
    return (
      <React.Fragment>
        <br />
        <Form.Group
          onChange={(e) => {
            let tintv = e.target.value !== "image" ? 0.0 : 0.17;
            setStore("background_mode", e.target.value);
            setStore("color_index", 0);
            setStore("tint_value", tintv);
            setStore("tint", tintv);
          }}
        >
          <Form.Label>Background Mode</Form.Label>
          <Form.Control defaultValue={s.background_mode} as="select">
            <option value="flat">Flat</option>
            <option value="gradient">Gradient</option>
            <option value="image">Image</option>
          </Form.Control>
        </Form.Group>
        {(s.background_mode === "flat" || s.background_mode === "gradient") && (
          <Form.Group
            onChange={(e) => {
              setStore("color_index", e.target.value);
            }}
          >
            <Form.Label>Color</Form.Label>
            <Form.Control defaultValue={s.color_index + ""} as="select">
              {colors[s.background_mode].map((c, i) => {
                return <option value={i}>{c.name}</option>;
              })}
            </Form.Control>
          </Form.Group>
        )}
        <div>
          {s.background_mode === "image" && (
            <div>
              <Form.Group>
                <Form.Label>Background Collection</Form.Label>
                <UnsplashSelect
                  value={s.image_tags}
                  onChange={(value) => {
                    setStore("image_tags", value);
                    refetchAndSetImage();
                  }}
                />
              </Form.Group>
            </div>
          )}
        </div>
        Tint
        <Slider
          value={s.tint * 100}
          step={1}
          onChange={(tint_value) => {
            setStore("tint_value", tint_value / 100.0);
            setStore("tint", tint_value / 100.0);
          }}
        />
        <br />
        <Form.Group
          onChange={(e) => {
            setStore("font", e.target.value);
          }}
        >
          <Form.Label>Font</Form.Label>
          <Form.Control defaultValue={s.font} as="select">
            <option value="Circular">Jakarta Sans</option>
            <option value="Futura">Futura</option>
            <option value="Product">Product</option>
            <option value="SharpGrotesk">Sharp Grotesk</option>
            <option value="BebasNeue">Bebas Neue</option>
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
        {s.background_mode === "image" && (
          <Form.Group
            onChange={(e) => {
              setStore("background_cycle", e.target.value);
            }}
          >
            <Form.Label>Cycle Background</Form.Label>
            <Form.Control defaultValue={s.background_cycle} as="select">
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
            <div
              className="toggle-button"
              onClick={() => {
                setStore("dots", s.dots === "0" ? "1" : "0");
              }}
            >
              &#xe3a5;
            </div>
          </Tooltipify>

          {s.background_mode === "image" && (
            <Tooltipify message="Invert">
              <div
                className="toggle-button"
                onClick={() => {
                  setStore(
                    "image_foreground",
                    s.image_foreground === "#ffffff" ? "#212529" : "#ffffff"
                  );
                }}
              >
                &#xe3ab;
              </div>
            </Tooltipify>
          )}

          {s.background_mode === "image" && (
            <Tooltipify message="Change Background">
              <div
                className={`toggle-button ${`settings-button ${
                  !s.refresh_enabled && "not-allowed"
                }`}`}
                onClick={refetchAndSetImage}
              >
                <span
                  dangerouslySetInnerHTML={{
                    __html: s.refresh_enabled ? "&#xe332;" : "&#xe88b;",
                  }}
                />
              </div>
            </Tooltipify>
          )}

          {s.background_mode === "image" && (
            <Tooltipify message="Open Image">
              <div className="toggle-button" onClick={this.openImage}>
                &#xe89e;
              </div>
            </Tooltipify>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default BackgroundSettings;
