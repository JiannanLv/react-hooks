import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { enableBatching } from "redux-batched-actions";
import { createHashHistory } from "history";
import { routerMiddleware } from "react-router-redux";

// 引入所有reducers
import reducers from "@/reducers";
// console.log(reducers)
const history = createHashHistory();

export default (initialState = {}) => {
  // ======================================================
  // 配置中间件
  // ======================================================
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [sagaMiddleware, routerMiddleware(history)]; // logger

  // ======================================================
  // 增强Store
  // ======================================================
  const enhancers = [];

  let composeEnhancers = compose;

  const composeWithDevToolsExtension =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  if (typeof composeWithDevToolsExtension === "function") {
    composeEnhancers = composeWithDevToolsExtension;
  }

  // ======================================================
  // 实例化Store，热替换HMR设置
  // ======================================================
  const store = createStore(
    enableBatching(reducers()),
    initialState,
    composeEnhancers(applyMiddleware(...middleware), ...enhancers)
  );
  store.asyncReducers = {};
  store.asyncSagas = {};
  store.runSaga = (saga) => {
    sagaMiddleware.run(saga);
  };
  store.history = history;

  if (module.hot) {
    module.hot.accept("@/reducers", () => {
      const reducersHot = require("@/reducers").default;
      store.replaceReducer(reducersHot(store.asyncReducers));
    });
  }

  return store;
};
