import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import layout from "./layout";

/**
 * 主reducers方法，合并各个子reducer
 * @param {object} asyncReducers
 */
export const makeRootReducer = asyncReducers =>
  combineReducers({
    ...asyncReducers,
    routing: routerReducer,
    layout
  });

export default makeRootReducer;