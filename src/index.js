import "react-app-polyfill/ie11"; // For IE 11 support
import "react-app-polyfill/stable";
import "./polyfill";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { usePromiseTracker } from "react-promise-tracker";

import { icons } from "./assets/icons";

import { Provider } from "react-redux";
import store from "./store";
import { CModal, CModalBody, CSpinner } from "@coreui/react";

React.icons = icons;

const LoadingIndicator = (props) => {
  const { promiseInProgress } = usePromiseTracker();
  return (
    promiseInProgress && (
      <CModal show={true}>
        <CModalBody>
          <CSpinner color="primary" style={{ width: "4rem", height: "4rem" }} />
        </CModalBody>
      </CModal>
    )
  );
};

ReactDOM.render(
  <Provider store={store}>
    <LoadingIndicator />
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
