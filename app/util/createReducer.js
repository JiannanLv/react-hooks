"use strict";

export default function (initialState, reducerMap) {
  return (state, action) => {
    state = state ? state : initialState;
    const reducer = reducerMap[action.type];
    return reducer ? reducer(state, action) : state;
  };
}
