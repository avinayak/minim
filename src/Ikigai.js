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
import ClockWidget from "./widgets/ClockWidget";
import CustomMessageWidget from "./widgets/CustomMessageWidget";
import colors from "./settings/colors";
import WeatherWidget from "./widgets/WeatherWidget";

import Settings from "./settings/Settings";

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
      loadingImage: false,
      filter: "saturate(0%)",
      tint: 1,

      background_mode: localStorage.getItem("background_mode"),
      dots: localStorage.getItem("dots"),
      tint_value: parseFloat(localStorage.getItem("tint_value")),
      image_index: localStorage.getItem("image_index"),
      image: localStorage.getItem("image"),
      image2: localStorage.getItem("image2"),
      font: localStorage.getItem("font"),
      widget: localStorage.getItem("widget"),
      clock_border: localStorage.getItem("clock_border"),
      weather_format: localStorage.getItem("weather_format"),
      clock_seperator: localStorage.getItem("clock_seperator"),
      clock_format: localStorage.getItem("clock_format"),
      background_cycle: localStorage.getItem("background_cycle"),
      temprature_unit: localStorage.getItem("temprature_unit"),
      widget_x: localStorage.getItem("widget_x"),
      widget_y: localStorage.getItem("widget_y"),
      message_size: localStorage.getItem("message_size"),
      message: localStorage.getItem("message"),
      image_foreground: localStorage.getItem("image_foreground"),
      image_tags: localStorage.getItem("image_tags"),
      color_index: localStorage.getItem("color_index"),
      location: localStorage.getItem("location"),
    };
  }

  unixToHumanTime(unix) {
    var date = new Date(parseInt(unix) * 1000);
    return date;
  }

  componentWillMount() {
    // get the first image on the first run, so user doesnt have to wait when
    // settings is changed
    if (!localStorage.getItem("collections2")) {
      localStorage.setItem("collections2", JSON.stringify([]));
    }
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
      image_tags: "likes:atulvi",
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
      widget_x: "center",
      widget_y: "center",
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
        this.setStore("image", b64img);
      });
    }
    if (!localStorage.getItem("image2")) {
      this.toDataUrl(UNSPLASH_URL, (b64img) => {
        this.setStore("image2", b64img);
      });
    }

    if (this.state.background_cycle === "tab") {
      this.refetchAndSetImageHidden();
      if (this.state.image_index === "0") {
        this.setStore("image_index", "1");
      } else {
        this.setStore("image_index", "0");
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
            this.setStore("image_index", "1");
          } else {
            this.setStore("image_index", "0");
          }
        }
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(timer);
  }

  componentDidMount() {
    console.log(window.screen);
    this.setState({
      tint: this.state.tint_value,
      filter: "saturate(100%)",
    });
    this.logNextBackgroundChange();
  }

  handleClose = () => {
    this.setState({ modalVisible: false });
  };

  handleOpen = () => {
    this.setState({ modalVisible: true });
  };

  setStore = (state_name, value) => {
    this.setState({ [state_name]: value });
    localStorage.setItem(state_name, value);
  };

  getStore = (state_name) => {
    return this.state[state_name];
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
      if (this.state.image_index === "1") this.setStore("image", b64img);
      else this.setStore("image2", b64img);
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
    let im_index = localStorage.getItem("image_index", "0");
    let imurl = localStorage.getItem("unsplash_image_download" + im_index);
    console.log(imurl);
    var win = window.open(imurl, "_blank");
    win.focus();
  };

  toDataUrl = (url, callback) => {
    console.log(url);
    let im_index = localStorage.getItem("image_index", "0");
    this.setState({ filter: "saturate(0%)", loadingImage: true });
    var xhr = new XMLHttpRequest();
    xhr.responseType = "blob";
    xhr.onload = () => {
      localStorage.setItem(
        "unsplash_image_download" + im_index,
        xhr.responseURL
      );
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

  xy_to_flex = {
    center: "center",
    left: "flex-start",
    right: "flex-end",
    top: "flex-start",
    bottom: "flex-end",
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
      <React.Fragment>
        <div
          class="flex-container"
          style={{
            justifyContent: this.xy_to_flex[this.state.widget_x],
            textAlign: this.state.widget_x,
            alignItems: this.xy_to_flex[this.state.widget_y],
          }}
        >
          <div class="widget">
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
              <Settings
                setStore={this.setStore}
                s={this.state}
                refetchAndSetImage={this.refetchAndSetImage}
                widgetNames={Object.keys(widgets)}
              />
            </Container>
          </Modal.Body>
        </Modal>
      </React.Fragment>
    );
  }
}

export default Ikigai;
