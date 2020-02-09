import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Modal,
  Form,
  Tabs,
  Tab,
  OverlayTrigger,
  Tooltip
} from "react-bootstrap";
import ClockWidget from "./ClockWidget";
import CustomMessageWidget from "./CustomMessageWidget";
import colors from "./colors";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const Tooltipify = ({ message, children }) => {
  return (
    <OverlayTrigger
      placement={"top"}
      overlay={<Tooltip id={`tooltipiii`}>{message}</Tooltip>}
    >
      {children}
    </OverlayTrigger>
  );
};

const UNSPLASH_URL = `https://source.unsplash.com/collection/1459961/${window.screen.width}x${window.screen.height}/`;
export class Ikigai extends Component {
  constructor() {
    super();
    this.state = {
      modalVisible: false,
      background_mode: localStorage.getItem("background_mode"),
      dots: localStorage.getItem("dots"),
      filter: "saturate(0%)",
      tint: 1,
      tint_value: parseFloat(localStorage.getItem("tint_value")),
      image: localStorage.getItem("image"),
      loadingImage: false,
      font: localStorage.getItem("font"),
      widget: localStorage.getItem("widget"),
      clock_border: localStorage.getItem("clock_border"),
      clock_seperator: localStorage.getItem("clock_seperator"),
      clock_format: localStorage.getItem("clock_format"),
      message_size: localStorage.getItem("message_size"),
      message: localStorage.getItem("message"),
      image_foreground: localStorage.getItem("image_foreground"),
      image_tags: localStorage.getItem("image_tags"),
      color_index: localStorage.getItem("color_index")
    };
  }
  componentWillMount() {
    document.addEventListener("keydown", this.keyHandle, false);
    // get the first image on the first run, so user doesnt have to wait when
    // settings is changed
    let default_values = {
      tint_value: 0.0,
      color_index: 0,
      background_mode: "flat",
      dots: 0,
      image_tags: "collection:1459961",
      image_foreground: "#ffffff",
      clock_seperator: "colon",
      clock_format: "12H",
      clock_border: "none",
      message_size: "50",
      message: "Hello!",
      widget: "clock",
      font: "Circular"
    };
    Object.keys(default_values).forEach(key => {
      if (!localStorage.getItem(key)) {
        localStorage.setItem(key, default_values[key]);
        this.setState({ [key]: default_values[key] });
      }
    });
    if (!localStorage.getItem("image")) {
      this.toDataUrl(UNSPLASH_URL, b64img => {
        this.setState({ image: b64img });
        localStorage.setItem("image", b64img);
      });
    }
  }
  componentDidMount() {
    document.addEventListener("keydown", this.keyHandle, false);
    console.log(window.screen);
    this.setState({
      tint: this.state.tint_value,
      filter: "saturate(100%)"
    });
  }

  keyHandle = event => {
    if (event.keyCode == 83 && !this.state.modalVisible) {
      this.invertColors();
    }
    if (event.keyCode == 68 && !this.state.modalVisible) {
      this.toggleDots();
    }
  };

  handleClose = () => {
    this.setState({ modalVisible: false });
  };

  handleOpen = () => {
    this.setState({ modalVisible: true });
  };

  invertColors = () => {
    let new_image_foreground =
      this.state.image_foreground == "#ffffff" ? "#212529" : "#ffffff";
    this.setState({ image_foreground: new_image_foreground });
    localStorage.setItem("image_foreground", new_image_foreground);
  };

  toggleDots = () => {
    let nd = this.state.dots == 0 ? 1 : 0;
    this.setState({ dots: nd });
    localStorage.setItem("dots", nd);
  };

  unsplash_url_fix = () => {
    let url = "";
    let rand = "random/";
    let base = `https://source.unsplash.com/`;
    let dimen = `${window.screen.width}x${window.screen.height}/`;
    if (this.state.image_tags === "") {
      url = base + rand + dimen;
    } else if (this.state.image_tags.startsWith("user:")) {
      let user = this.state.image_tags.split(":")[1];
      url = base + `user/${user}/` + dimen;
    } else if (this.state.image_tags.startsWith("likes:")) {
      let user = this.state.image_tags.split(":")[1];
      url = base + `user/${user}/likes/` + dimen;
    } else if (this.state.image_tags.startsWith("collection:")) {
      let cid = this.state.image_tags.split(":")[1];
      url = base + `collection/${cid}/` + dimen;
    } else {
      url = base + rand + dimen + `?/${this.state.image_tags}`;
    }
    return url;
  };

  refetchAndSetImage = () => {
    this.toDataUrl(this.unsplash_url_fix(), b64img => {
      localStorage.setItem("image", b64img);
      this.setState({ image: b64img });
    });
  };

  openImage = () => {
    let imurl = localStorage.getItem("unsplash_image_download");
    var win = window.open(imurl, '_blank');
    win.focus();
  };

  toDataUrl = (url, callback) => {
    console.log(url);
    this.setState({ filter: "saturate(0%)", loadingImage: true });
    var xhr = new XMLHttpRequest();
    xhr.responseType = "blob";
    xhr.onload = () => {
      localStorage.setItem("unsplash_image_download", xhr.responseURL);
      var reader = new FileReader();
      reader.onloadend = () => {
        callback(reader.result);
        this.setState({ filter: "saturate(100%)", loadingImage: false });
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open("GET", url);
    xhr.send();
  };

  render() {
    let widgets = {
      clock: ClockWidget,
      message: CustomMessageWidget
    };

    let {
      modalVisible,
      loadingImage,
      background_mode,
      dots,
      image,
      filter,
      font,
      widget,
      clock_border,
      clock_seperator,
      clock_format,
      message_size,
      message,
      image_foreground,
      image_tags,
      color_index
    } = this.state;
    let WidgetComponent = widgets[widget];
    let background =
      background_mode != "image"
        ? {
            background:
              colors[this.state.background_mode][this.state.color_index]
                .background
          }
        : {
            background: `url(${image}) no-repeat center center`,
            filter
          };

    let foreground =
      background_mode != "image"
        ? colors[this.state.background_mode][this.state.color_index].foreground
        : image_foreground;

    return (
      <div>
        <div className="center-boy">
          <WidgetComponent
            foreground={foreground}
            font={font}
            clock_border={clock_border}
            clock_seperator={clock_seperator}
            clock_format={clock_format}
            message_size={message_size}
            message={message}
          />
        </div>
        <div>
          {loadingImage && (
            <div className="spinner-wrap">
              <span className="wobblebar-loader">Loading…</span>
            </div>
          )}
        </div>
        <div className="buttons">
          {background_mode == "image" && (
            <span>
              {/* <div
                style={{
                  color: foreground
                }}
                className={`settings-button`}
                onClick={this.invertColors}
              >
                &#xe891;
              </div> */}
              <div
                style={{
                  color: foreground
                }}
                className="settings-button"
                onClick={this.refetchAndSetImage}
              >
                &#xe332;
              </div>
            </span>
          )}
          <div
            style={{
              color: foreground
            }}
            className="settings-button"
            onClick={this.handleOpen}
          >
            &#xe8b8;
          </div>
        </div>
        <div className="background-layer" style={background} />
        <div
          className="tint-layer"
          style={{
            opacity: this.state.tint,
            background: image_foreground == "#ffffff" ? "#111111" : "#ffffff"
          }}
        />

        {dots == 1 && <div className="tint-layer dots" />}

        <Modal
          size="lg"
          animation={false}
          show={modalVisible}
          onHide={this.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Settings</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Tabs defaultActiveKey="background" id="uncontrolled-tab-example">
                <Tab eventKey="background" title="Background">
                  <br />
                  <Form.Group
                    onChange={e => {
                      localStorage.setItem("background_mode", e.target.value);
                      localStorage.setItem("color_index", 0);

                      let tintv = e.target.value !== "image" ? 0.0 : 0.17;
                      this.setState({
                        background_mode: e.target.value,
                        tint_value: tintv,
                        tint: tintv,
                        color_index: 0
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
                  {(this.state.background_mode == "flat" ||
                    this.state.background_mode == "gradient") && (
                    <Form.Group
                      onChange={e => {
                        localStorage.setItem("color_index", e.target.value);
                        this.setState({
                          color_index: parseInt(e.target.value)
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
                    {this.state.background_mode == "image" && (
                      <div>
                        <Form.Group
                          onChange={e => {
                            localStorage.setItem("image_tags", e.target.value);
                            this.setState({ image_tags: e.target.value });
                          }}
                        >
                          <OverlayTrigger
                            key={"left"}
                            placement={"left"}
                            overlay={
                              <Tooltip id={`tooltipiii`}>
                                <ul>
                                  <li>
                                    You can place comma seperated tags here (eg:
                                    Nature, Motivation, Art)
                                  </li>
                                  <li>
                                    Unsplash collections: collection:9270463
                                  </li>
                                  <li>Unsplash User Images: user:atulvi</li>
                                  <li>Unsplash User Likes: likes:atulvi</li>
                                </ul>
                              </Tooltip>
                            }
                          >
                            <Form.Label>Unsplash Tags</Form.Label>
                          </OverlayTrigger>
                          <Form.Control
                            placeholder="Nature, art, wallpaper"
                            defaultValue={image_tags}
                            as="input"
                            rows="3"
                          />
                        </Form.Group>
                      </div>
                    )}
                  </div>
                  Tint
                  <Slider
                    value={this.state.tint * 100}
                    step={1}
                    onChange={tint_value => {
                      localStorage.setItem("tint_value", tint_value / 100.0);
                      this.setState({
                        tint: tint_value / 100.0,
                        tint_value: tint_value / 100.0
                      });
                    }}
                  />
                  <br />
                  <Form.Group
                    onChange={e => {
                      localStorage.setItem("font", e.target.value);
                      this.setState({ font: e.target.value });
                    }}
                  >
                    <Form.Label>Font</Form.Label>
                    <Form.Control defaultValue={font} as="select">
                      <option value="Circular">Circular</option>
                      <option value="Futura">Futura</option>
                      <option value="SharpGrotesk">SharpGrotesk</option>
                      <option value="Milea">Milea</option>
                    </Form.Control>
                  </Form.Group>
                  <div className="modal-button-row">
                    <Tooltipify message="Texture">
                      <div className="toggle-button" onClick={this.toggleDots}>
                        &#xe3a5;
                      </div>
                    </Tooltipify>

                    {background_mode == "image" && (
                      <Tooltipify message="Invert">
                        <div
                          className="toggle-button"
                          onClick={this.invertColors}
                        >
                          &#xe891;
                        </div>
                      </Tooltipify>
                    )}

                    {background_mode == "image" && (
                      <Tooltipify message="Change Background">
                        <div
                          className="toggle-button"
                          onClick={this.refetchAndSetImage}
                        >
                          &#xe332;
                        </div>
                      </Tooltipify>
                    )}

                    {background_mode == "image" && (
                      <Tooltipify message="Open Image">
                        <div
                          className="toggle-button"
                          onClick={this.openImage}
                        >
                          &#xe89e;
                        </div>
                      </Tooltipify>
                    )}
                  </div>
                </Tab>
                <Tab eventKey="widget" title="Widget">
                  <br />
                  <Form.Group
                    onChange={e => {
                      localStorage.setItem("widget", e.target.value);
                      this.setState({ widget: e.target.value });
                    }}
                  >
                    <Form.Label>Widget</Form.Label>
                    <Form.Control defaultValue={widget} as="select">
                      {Object.keys(widgets).map(wid => (
                        <option value={wid}>{wid}</option>
                      ))}
                    </Form.Control>
                  </Form.Group>
    
                  {widget == "message" && (
                    <div>
                      <Row className="show-grid">
                        <Col md={12}>
                          <Form.Group
                            onChange={e => {
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
                            onChange={e => {
                              localStorage.setItem(
                                "message_size",
                                e.target.value
                              );
                              this.setState({ message_size: e.target.value });
                            }}
                          >
                            <Form.Label>Message Size</Form.Label>
                            <Form.Control
                              defaultValue={message_size}
                              as="select"
                            >
                              {[...Array(20).keys()]
                                .filter(siz => siz > 1)
                                .map(siz => (
                                  <option value={siz * 10}>{siz * 10}</option>
                                ))}
                            </Form.Control>
                          </Form.Group>
                        </Col>
                      </Row>
                    </div>
                  )}
                  {widget == "clock" && (
                    <div>
                      <Row className="show-grid">
                        <Col md={12}>
                          <Form.Group
                            onChange={e => {
                              localStorage.setItem(
                                "clock_border",
                                e.target.value
                              );
                              this.setState({ clock_border: e.target.value });
                            }}
                          >
                            <Form.Label>Border Style</Form.Label>
                            <Form.Control
                              defaultValue={clock_border}
                              as="select"
                            >
                              <option value="none">none</option>
                              <option value="solid">solid</option>
                              <option value="rounded">rounded</option>
                            </Form.Control>
                          </Form.Group>
                        </Col>

                        <Col md={12}>
                          <Form.Group
                            onChange={e => {
                              localStorage.setItem(
                                "clock_seperator",
                                e.target.value
                              );
                              this.setState({
                                clock_seperator: e.target.value
                              });
                            }}
                          >
                            <Form.Label>Seperator</Form.Label>
                            <Form.Control
                              defaultValue={clock_seperator}
                              as="select"
                            >
                              <option value="colon">colon</option>
                              <option value="none">none</option>
                              <option value="space">space</option>
                            </Form.Control>
                          </Form.Group>
                        </Col>

                        <Col md={12}>
                          <Form.Group
                            onChange={e => {
                              localStorage.setItem(
                                "clock_format",
                                e.target.value
                              );
                              this.setState({ clock_format: e.target.value });
                            }}
                          >
                            <Form.Label>Format</Form.Label>
                            <Form.Control
                              defaultValue={clock_format}
                              as="select"
                            >
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
              </Tabs>
            </Container>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default Ikigai;
