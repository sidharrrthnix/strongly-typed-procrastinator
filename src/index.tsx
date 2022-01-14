import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App/App";
import { Provider } from "react-redux";
import store from "./redux/store";
import Recorder from "./components/Recorder";
import Calendar from "./components/Calender/Calendar";

ReactDOM.render(
  <Provider store={store}>
    <Recorder />
    <Calendar />
  </Provider>,

  document.getElementById("root")
);
