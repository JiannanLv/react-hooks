import createAction from "@/util/createAction";

// 新添加图表
export const ADD_NEW_WIDGET = "ADD_NEW_WIDGET";
export const ADD_NEW_WIDGET_STATE = "ADD_NEW_WIDGET_STATE";

export const addNewWidget = createAction(ADD_NEW_WIDGET, "data");
