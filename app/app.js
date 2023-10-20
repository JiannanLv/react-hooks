import "whatwg-fetch";
import React from "react";
import { render } from "react-dom";
import createStore from "./store/createStore";
import AppContainer from "./views/AppContainer";
import rootSaga from "./sagas";

import "@/util/extends";
import "moment/locale/zh-cn";
import "./styles/app.scss";
import "./styles/base.scss";

// ========================================================
// Store Instantiation
// ========================================================
const initialState = {};
const store = createStore(initialState);
store.runSaga(rootSaga);

render(<AppContainer store={store} />, document.querySelector("#root"));

// hot replace module
if (module.hot) {
  module.hot.accept();
}
