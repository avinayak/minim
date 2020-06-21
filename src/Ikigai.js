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
  Tooltip,
} from "react-bootstrap";
import ClockWidget from "./ClockWidget";
import CustomMessageWidget from "./CustomMessageWidget";
import colors from "./colors";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import UnsplashSelect from "./UnsplashSelect";
import WeatherWidget from "./WeatherWidget";
import PlacesSelect from "./PlacesSelect";

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

let timer = null;

const UNSPLASH_URL = `https://source.unsplash.com/collection/1459961/${window.screen.width}x${window.screen.height}/`;
export class Ikigai extends Component {
  constructor() {
    super();
    this.state = {
      modalVisible: false,
      refresh_enabled: true,
      background_mode: localStorage.getItem("background_mode"),
      dots: localStorage.getItem("dots"),
      filter: "saturate(0%)",
      tint: 1,
      tint_value: parseFloat(localStorage.getItem("tint_value")),
      image_index: localStorage.getItem("image_index"),
      image: localStorage.getItem("image"),
      image2: localStorage.getItem("image2"),
      loadingImage: false,
      font: localStorage.getItem("font"),
      widget: localStorage.getItem("widget"),
      clock_border: localStorage.getItem("clock_border"),
      weather_format: localStorage.getItem("weather_format"),
      clock_seperator: localStorage.getItem("clock_seperator"),
      clock_format: localStorage.getItem("clock_format"),
      background_cycle: localStorage.getItem("background_cycle"),
      temprature_unit: localStorage.getItem("temprature_unit"),
      message_size: localStorage.getItem("message_size"),
      message: localStorage.getItem("message"),
      image_foreground: localStorage.getItem("image_foreground"),
      image_tags: localStorage.getItem("image_tags"),
      color_index: localStorage.getItem("color_index"),
      location: localStorage.getItem("location"),
    };

    if (!localStorage.getItem("collections2")) {
      localStorage.setItem("collections2", JSON.stringify([]));
    }
  }

  unixToHumanTime(unix) {
    var date = new Date(parseInt(unix) * 1000);
    return date;
  }
  componentWillMount() {
    document.addEventListener("keydown", this.keyHandle, false);
    // get the first image on the first run, so user doesnt have to wait when
    // settings is changed
    if (!localStorage.getItem("weather_last_updated")) {
      localStorage.setItem("weather_last_updated", "0");
    }
    if (!localStorage.getItem("background_last_updated")) {
      localStorage.setItem("background_last_updated", "0");
    }
    let default_values = {
      tint_value: 0.0,
      color_index: 0,
      background_mode: "flat",
      dots: "0",
      image_tags: "collection:3330448",
      image_foreground: "#ffffff",
      clock_seperator: "colon",
      clock_format: "12H",
      image_index: "0",
      temprature_unit: "C",
      clock_border: "none",
      weather_format: "ts",
      message_size: "50",
      message: "Hello!",
      widget: "clock",
      font: "Circular",
      background_cycle: "never",
      location: JSON.stringify({
        value: "139.7594549,35.6828387",
        label: "Tokyo, Japan",
      }),
    };
    Object.keys(default_values).forEach((key) => {
      if (!localStorage.getItem(key)) {
        localStorage.setItem(key, default_values[key]);
        this.setState({ [key]: default_values[key] });
      }
    });
    if (!localStorage.getItem("image")) {
      this.toDataUrl(UNSPLASH_URL, (b64img) => {
        this.setState({ image: b64img });
        localStorage.setItem("image", b64img);
      });
    }
    if (!localStorage.getItem("image2")) {
      this.toDataUrl(UNSPLASH_URL, (b64img) => {
        this.setState({ image2: b64img });
        localStorage.setItem("image2", b64img);
      });
    }

    if (this.state.background_cycle === "tab") {
      this.refetchAndSetImageHidden();
      if (this.state.image_index === "0") {
        localStorage.setItem("image_index", "1");
        this.setState({ image_index: "1" });
      } else {
        localStorage.setItem("image_index", "0");
        this.setState({ image_index: "0" });
      }
    }

    timer = setInterval(() => {
      if (
        this.state.background_cycle !== "tab" &&
        this.state.background_cycle !== "never"
      ) {
        let background_last_updated = parseInt(
          localStorage.getItem("background_last_updated")
        );
        let time_now = Math.round(new Date().getTime() / 1000);
        let background_update_freq = parseInt(this.state.background_cycle);

        if (background_last_updated + background_update_freq <= time_now) {
          this.refetchAndSetImageHidden();
          let time_now = Math.round(new Date().getTime() / 1000);
          localStorage.setItem("background_last_updated", time_now);

          console.log(
            `Next background update at ${this.unixToHumanTime(
              background_last_updated + background_update_freq
            )}`
          );

          if (this.state.image_index === "0") {
            localStorage.setItem("image_index", "1");
            this.setState({ image_index: "1" });
          } else {
            localStorage.setItem("image_index", "0");
            this.setState({ image_index: "0" });
          }
        }
      }
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(timer);
  }
  componentDidMount() {
    document.addEventListener("keydown", this.keyHandle, false);
    console.log(window.screen);
    this.setState({
      tint: this.state.tint_value,
      filter: "saturate(100%)",
    });
    this.logNextBackgroundChange();
  }

  keyHandle = (event) => {
    if (event.keyCode === 83 && !this.state.modalVisible) {
      this.invertColors();
    }
    if (event.keyCode === 68 && !this.state.modalVisible) {
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
      this.state.image_foreground === "#ffffff" ? "#212529" : "#ffffff";
    this.setState({ image_foreground: new_image_foreground });
    localStorage.setItem("image_foreground", new_image_foreground);
  };

  toggleDots = () => {
    let nd = this.state.dots === "0" ? "1" : "0";
    this.setState({ dots: nd });
    localStorage.setItem("dots", nd);
  };

  unsplash_url_fix = () => {
    let url = "";
    let rand = "random/";
    let base = `https://source.unsplash.com/`;
    let dimen = `${window.screen.width}x${window.screen.height}/`;
    let image_tags = localStorage.getItem("image_tags");
    if (image_tags === "") {
      url = base + rand + dimen;
    } else if (image_tags.startsWith("user:")) {
      let user = image_tags.split(":")[1];
      url = base + `user/${user}/` + dimen;
    } else if (image_tags.startsWith("likes:")) {
      let user = image_tags.split(":")[1];
      url = base + `user/${user}/likes/` + dimen;
    } else if (image_tags.startsWith("collection:")) {
      let cid = image_tags.split(":")[1];
      url = base + `collection/${cid}/` + dimen;
    } else {
      url = base + rand + dimen + `?/${image_tags}`;
    }
    return url;
  };

  refetchAndSetImageHidden = () => {
    this.toDataUrl(this.unsplash_url_fix(), (b64img) => {
      if (this.state.image_index === "1") {
        localStorage.setItem("image", b64img);
        this.setState({ image: b64img });
      } else {
        localStorage.setItem("image2", b64img);
        this.setState({ image2: b64img });
      }
    });
  };

  logNextBackgroundChange = () => {
    if (
      this.state.background_cycle !== "tab" &&
      this.state.background_cycle !== "never"
    ) {
      let background_update_freq = parseInt(this.state.background_cycle);
      let background_last_updated = parseInt(
        localStorage.getItem("background_last_updated")
      );

      console.log(
        `Next Background change at ${this.unixToHumanTime(
          background_update_freq + background_last_updated
        )}`
      );
    }
  };
  refetchAndSetImage = () => {
    if (this.state.refresh_enabled) {
      this.setState({ refresh_enabled: false });
      setTimeout(() => {
        this.setState({ refresh_enabled: true });
      }, 2700);
      this.toDataUrl(this.unsplash_url_fix(), (b64img) => {
        let time_now = Math.round(new Date().getTime() / 1000);
        localStorage.setItem("background_last_updated", time_now);

        this.logNextBackgroundChange();

        if (this.state.image_index === "0") {
          localStorage.setItem("image", b64img);
          this.setState({ image: b64img });
        } else {
          localStorage.setItem("image2", b64img);
          this.setState({ image2: b64img });
        }
      });
    }
  };

  openImage = () => {
    let imurl = localStorage.getItem("unsplash_image_download");
    if (this.state.image_index === "0") {
      imurl = localStorage.getItem("unsplash_image_download2");
    }
    var win = window.open(imurl, "_blank");
    win.focus();
  };

  toDataUrl = (url, callback) => {
    console.log(url);
    this.setState({ filter: "saturate(0%)", loadingImage: true });
    var xhr = new XMLHttpRequest();
    xhr.responseType = "blob";
    xhr.onload = () => {

      if (this.state.image_index === "0") {
        localStorage.setItem("unsplash_image_download", xhr.responseURL);
      } else {
        localStorage.setItem("unsplash_image_download2", xhr.responseURL);
      }


      console.log(this.state.image_index)
      console.log(localStorage.getItem("unsplash_image_download2"))
      console.log(localStorage.getItem("unsplash_image_download"))
     

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
      message: CustomMessageWidget,
      weather: WeatherWidget,
    };

    let {
      modalVisible,
      loadingImage,
      background_mode,
      dots,
      image,
      image2,
      image_index,
      filter,
      font,
      background_cycle,
      location,
      widget,
      clock_border,
      weather_format,
      clock_seperator,
      clock_format,
      temprature_unit,
      message_size,
      message,
      image_foreground,
      image_tags,
      color_index,
    } = this.state;

    if (image_index === "1") image = image2;
    let WidgetComponent = widgets[widget];
    let background =
      background_mode !== "image"
        ? {
            background:
              colors[this.state.background_mode][color_index].background,
          }
        : {
            background: `url(${image}) no-repeat center center`,
            filter,
          };

    let foreground =
      background_mode !== "image"
        ? colors[this.state.background_mode][color_index].foreground
        : image_foreground;

    return (
      <div>
        <div className="center-boy">
          <WidgetComponent
            foreground={foreground}
            font={font}
            clock_border={clock_border}
            weather_format={weather_format}
            clock_seperator={clock_seperator}
            clock_format={clock_format}
            temprature_unit={temprature_unit}
            message_size={message_size}
            message={message}
            location={location}
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
          {background_mode === "image" && (
            <span>
              <Tooltipify message="Change Background">
                <div
                  style={{
                    color: foreground,
                  }}
                  className={`settings-button ${
                    !this.state.refresh_enabled && "not-allowed"
                  }`}
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
            </span>
          )}
          <Tooltipify message="Settings">
            <div
              style={{
                color: foreground,
              }}
              className="settings-button"
              onClick={this.handleOpen}
            >
              &#xe8b8;
            </div>
          </Tooltipify>
        </div>
        <div className="background-layer" style={background} />
        <div
          className="tint-layer"
          style={{
            opacity: this.state.tint,
            background: image_foreground === "#ffffff" ? "#111111" : "#ffffff",
          }}
        />

        {dots === "1" && <div className="tint-layer dots" />}

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
                        localStorage.setItem(
                          "background_cycle",
                          e.target.value
                        );
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
                        <div
                          className="toggle-button"
                          onClick={this.invertColors}
                        >
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
                              localStorage.setItem(
                                "clock_border",
                                e.target.value
                              );
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
                              localStorage.setItem(
                                "weather_format",
                                e.target.value
                              );
                              this.setState({
                                weather_format: e.target.value,
                              });
                            }}
                          >
                            <Form.Label>Weather Format</Form.Label>
                            <Form.Control
                              defaultValue={weather_format}
                              as="select"
                            >
                              <option value="t">Temprature</option>
                              <option value="ts">Temprature and Summary</option>
                            </Form.Control>
                          </Form.Group>
                        </Col>

                        <Col md={12}>
                          <Form.Group
                            onChange={(e) => {
                              localStorage.setItem(
                                "temprature_unit",
                                e.target.value
                              );
                              this.setState({
                                temprature_unit: e.target.value,
                              });
                            }}
                          >
                            <Form.Label>Temprature Unit</Form.Label>
                            <Form.Control
                              defaultValue={temprature_unit}
                              as="select"
                            >
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
                            onChange={(e) => {
                              localStorage.setItem(
                                "clock_seperator",
                                e.target.value
                              );
                              this.setState({
                                clock_seperator: e.target.value,
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
                            onChange={(e) => {
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
                <Tab eventKey="about" title="About">
                  <center>
                    <br />
                    <img src="./icon128.png"></img>
                    <br />
                    Minim v2.1.0
                    <br /> <br />
                    <small>
                      <b>
                        Designed by{" "}
                        <a href="https://twitter.com/atulvinayak">
                          @atulvinayak
                        </a>
                      </b>
                      <br />
                      <br />
                      Weather Data by <a href="https://darksky.net">
                        Dark Sky
                      </a>{" "}
                      <br />
                      Backgrounds from{" "}
                      <a href="https://unsplash.com">Unslpash</a>
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
            </Container>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default Ikigai;
