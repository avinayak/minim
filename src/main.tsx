import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./App.scss";
import "rc-slider/assets/index.css";
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

import "./bootstrap.min.css";
import { ErrorBoundadry } from "./ErrorBoundary";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundadry>
      <App />
    </ErrorBoundadry>
  </React.StrictMode>
);
