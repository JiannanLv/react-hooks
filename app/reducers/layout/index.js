import immutable from "seamless-immutable";
import undoable from "redux-undo";

import createReducer from "@/util/createReducer";
import { ADD_NEW_WIDGET_STATE } from "@/actions/layoutAction";

const initState = immutable({
  data: {}, //所有的控件数据在这里
});

export default undoable(
  createReducer(initState, {
    [ADD_NEW_WIDGET_STATE]: (state, { data }) =>
      state.merge({ data }, { deep: true }),
  }),
  {
    limit: 6,
    filter: (action) => {
      const exp = /_STATE/;
      return exp.test(action.type);
    },
  }
);
