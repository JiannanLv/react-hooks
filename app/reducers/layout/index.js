import immutable from "seamless-immutable";
import undoable from "redux-undo";

import createReducer from "@/util/createReducer";
import {
  APP_UNDO_STATE,
  ADD_NEW_WIDGET_STATE,
  ADD_NEW_XLINE,
  DELETE_XLINE_STATE,
  ADD_NEW_YLINE,
  DELETE_YLINE_STATE,
  SET_WIDGET_DATA_STATE,
  DELETE_WIDGET_STATE,
  SELECT_WIDGET_CONTROL,
  SET_MENU_DRAWER_CONTROL,
  SHOW_WIDGET_EDIT_CONTROL,
  SHOW_NAME_LIST_CONTROL,
  DRAG_SELECT_EVEN_CONTROL,
  WIDGET_EVEN_GROUP_STATE,
  OPEN_EVEN_GROUP_STATE,
  DRAG_EVEN_GROUP_CONTROL,
  DELETE_EVEN_WIDGET_STATE,
  DELETE_GROUP_WIDGET_STATE,
  DRAWREGION_CLICK_CONTROL,
  CONTEXTMENU_CONTROL,
  UPDATE_PROJECT_PAGE_ID,
  CANVAS_GRID_CONTROL,
  SCALE_PLATE_CONTROL,
  SET_COPY_ID_CONTROL,
  CHANGE_GROUP_STATE,
  SAVE_PAGE_WIDGET_DATA,
  GET_PAGE_WIDGET_DATA,
  EVEN_GROUP_RECORD,
  SET_DRAGBOL_EDIT,
  SET_PAGE_WIDGET,
  LAYOUT_UPDATE_WIDGET_DATA,
  ADD_WIDGET_DATA_FIELD_SAGA,
  CONTROL_FILTER_ALERT_STATUS,
  SET_WIDGET_DATA_FILTER,
  DELETE_WIDGET_FILTER_ITEM,
  SET_DATA_SORT_STATUS,
  REMOVE_WIDGET_DATA_FIELD_SAGA,
  SET_SELECT_DATASET_ID,
  TEST_UPDATE_DATA_SWITCH,
  SET_REMOTE_RECEIVE_VALUE,
  UNDO_COMPARISON_SAGA,
  KEY_SELECT_EVEN_CONTROL,
  SET_LAYOUT_SCALE_CONTROL,
  UPDATE_FODDER_ALERT_STATUS,
  ADD_WIDGET_DATA_DRILL,
  DRAGE_WIDGET_DATA,
} from "@/actions/layoutAction";

const initState = immutable({
  data: {}, //所有的控件数据在这里
  spaceId: "", //空间ID
  pageId: "", //页面ID
  pageOption: {
    config: {
      width: 1920,
      height: 1080,
    },
  }, //页面的相关配置信息
  selectWidget: "", //当前选择的控件
  copyWidget: "", //要复制的控件
  drawer: "", //左侧菜单抽屉
  dragBol: true, //缩放页面下控制是否可拖拽
  edit: "", //控件的当前修改类型
  fodder: false, //添加至素材组弹框状态
  scale: 1, //缩放比例
  nameList: false, //控件名称列表的显隐
  filterAlertShow: false, //过滤器显隐控制
  selectEven: [], //多选的控件在这里暂时保存
  groupWidget: {}, //编组控件在这里保存
  contextmenu: {}, //右键信息
  xLine: [], //已拖拽标尺线
  yLine: [], //已拖拽标尺线
  canvasGrid: false, //网格线
  scalePlate: true, //标尺线是否显示
  recordAdd: [], //新添加的控件
  recordUpdate: [], //修改的控件
  recordDelete: [], //删除的控件
});

export default undoable(
  createReducer(initState, {
    [UPDATE_PROJECT_PAGE_ID]: (state, { spaceId, pageId }) =>
      state.set("spaceId", spaceId).set("pageId", pageId),

    [ADD_NEW_WIDGET_STATE]: (state, { data }) =>
      state
        .merge({ data }, { deep: true })
        .update("recordAdd", (record) => Object.keys(data).concat(record)),

    [SET_WIDGET_DATA_STATE]: (state, { data: { id, type, data } }) =>
      state
        .update("data", (allData) =>
          typeof id !== "string"
            ? id.reduce(
                (allD, oneId) =>
                  allD.setIn(
                    typeof type == "string"
                      ? [oneId, type]
                      : [oneId].concat(type),
                    data
                  ),
                allData
              )
            : typeof type == "string"
            ? allData.setIn([id, type], data)
            : typeof type[0] == "string"
            ? allData.setIn([id].concat(type), data)
            : type.reduce(
                (allD, { pipe, value }) => allD.setIn([id].concat(pipe), value),
                allData
              )
        )
        .update("recordUpdate", (record) =>
          typeof id == "string" ? [id].concat(record) : id.concat(record)
        ),

    [DELETE_WIDGET_STATE]: (state, { id }) =>
      state
        .set("edit", "")
        .set("selectWidget", "")
        .set("contextmenu", {})
        .update("data", (data) => data.without(id))
        .update("recordDelete", (record) => [id].concat(record)),

    [SET_LAYOUT_SCALE_CONTROL]: (state, { scale }) => state.set("scale", scale),

    [SELECT_WIDGET_CONTROL]: (state, { id }) =>
      state
        .set("selectWidget", id)
        .set("contextmenu", {})
        .set("selectEven", [])
        .set("drawer", ""),

    [SET_MENU_DRAWER_CONTROL]: (state, { data }) =>
      state.set("drawer", data).set("contextmenu", {}),

    [SHOW_WIDGET_EDIT_CONTROL]: (state, { data }) =>
      state.set("edit", data).set("contextmenu", {}),

    [SHOW_NAME_LIST_CONTROL]: (state, { data }) =>
      state.set("nameList", data).set("contextmenu", {}),

    [DRAG_SELECT_EVEN_CONTROL]: (state, { data }) =>
      state.set("edit", "").set("selectWidget", "").set("selectEven", data),

    [KEY_SELECT_EVEN_CONTROL]: (state, { group }) =>
      state.set("edit", "").set("selectWidget", "").set("selectEven", group),

    [WIDGET_EVEN_GROUP_STATE]: (state, { data, id }) =>
      state
        .merge({ groupWidget: data }, { deep: true })
        .set("selectEven", [])
        .set("selectWidget", id)
        .set("contextmenu", {}),

    [OPEN_EVEN_GROUP_STATE]: (state, { id }) =>
      state
        .update("groupWidget", (data) => {
          let newData = Object.assign({}, data);
          for (let i in data) {
            if (data[i] == id) delete newData[i];
          }
          return newData;
        })
        .set("selectWidget", "")
        .set("contextmenu", {}),

    [DRAG_EVEN_GROUP_CONTROL]: (state, { data }) =>
      data
        .reduce(
          (nowState, widget) =>
            nowState.setIn(["data", widget.id, widget.type], widget.data),
          state
        )
        .set("contextmenu", {}),

    [CHANGE_GROUP_STATE]: (state, { data }) =>
      data
        .reduce(
          (nowState, widget) =>
            nowState.setIn(["data", widget.id, widget.type], widget.data),
          state
        )
        .set("contextmenu", {})
        .update("recordUpdate", (record) =>
          data.map(({ id }) => id).concat(record)
        ),

    [EVEN_GROUP_RECORD]: (state, { group }) =>
      state.update("recordUpdate", (record) => group.concat(record)),

    [DELETE_EVEN_WIDGET_STATE]: (state, { id }) =>
      id
        .reduce(
          (nowState, nowId) =>
            nowState.update("data", (allData) => allData.without(nowId)),
          state
        )
        .set("selectEven", [])
        .set("contextmenu", {})
        .update("recordDelete", (record) => id.concat(record)),

    [DELETE_GROUP_WIDGET_STATE]: (state, { id }) =>
      id
        .reduce(
          (nowState, nowId) =>
            nowState
              .update("data", (allData) => allData.without(nowId))
              .update("groupWidget", (allData) => allData.without(nowId)),
          state
        )
        .set("selectWidget", "")
        .set("contextmenu", {})
        .update("recordDelete", (record) => id.concat(record)),

    [DRAWREGION_CLICK_CONTROL]: (state) =>
      state
        .set("selectWidget", "")
        .set("selectEven", [])
        .set("edit", "")
        .set("nameList", false)
        .set("drawer", "")
        .set("contextmenu", {}),

    [CONTEXTMENU_CONTROL]: (state, { data }) =>
      state.set("contextmenu", data).set("edit", ""),

    [ADD_NEW_XLINE]: (state, { data }) =>
      state.update("xLine", (usedData) => data.concat(usedData)),

    [DELETE_XLINE_STATE]: (state, { id }) =>
      state.update("xLine", (usedData) =>
        usedData.filter((item) => item.id !== id)
      ),

    [ADD_NEW_YLINE]: (state, { data }) =>
      state.update("yLine", (usedData) => data.concat(usedData)),

    [DELETE_YLINE_STATE]: (state, { id }) =>
      state.update("yLine", (usedData) =>
        usedData.filter((item) => item.id !== id)
      ),

    [CANVAS_GRID_CONTROL]: (state, { data }) => state.set("canvasGrid", data),

    [SCALE_PLATE_CONTROL]: (state, { data }) => state.set("scalePlate", data),

    [SET_COPY_ID_CONTROL]: (state, { id }) => state.set("copyWidget", id),

    [APP_UNDO_STATE]: (state) => state.update("appUndoState", (data) => !data),

    [SAVE_PAGE_WIDGET_DATA]: (state) =>
      state
        .set("recordAdd", [])
        .set("recordUpdate", [])
        .set("recordDelete", []),

    [UNDO_COMPARISON_SAGA]: (state, { data }) =>
      state.update(data.type, (id) => id.concat(data.diff)),

    [GET_PAGE_WIDGET_DATA]: (
      state,
      { data, pageOption, groupWidget, xLine, yLine }
    ) =>
      state
        .set("data", data)
        .set("xLine", xLine)
        .set("yLine", yLine)
        .set("pageOption", pageOption)
        .set("groupWidget", groupWidget),
    [SET_DRAGBOL_EDIT]: (state, { data }) => state.set("dragBol", data),
    // state.set("dragBol", data).set("data", {}),
    [SET_PAGE_WIDGET]: (state, { data }) => state.set("pageOption", data),

    [ADD_WIDGET_DATA_FIELD_SAGA]: (
      state,
      {
        data: {
          id,
          type,
          name,
          sort,
          order,
          widget,
          handleType,
          fieldType,
          typeField,
          dataField,
        },
      }
    ) =>
      state
        .setIn(["data", widget, "dataSource", fieldType + "Field"], typeField)
        .setIn(["data", widget, "dataSource", "dataField"], dataField)
        .setIn(
          ["data", widget, "dataSource", "dataConfig", type, "columns", id],
          { name, handleType, order, fieldType, sort: sort || null }
        )
        .update("recordUpdate", (record) => [widget].concat(record)),

    [REMOVE_WIDGET_DATA_FIELD_SAGA]: (
      state,
      { data: { widget, type, id, name, fieldType, typeField, dataField } }
    ) =>
      state
        .setIn(["data", widget, "dataSource", fieldType + "Field"], typeField)
        .setIn(["data", widget, "dataSource", "dataField"], dataField)
        .updateIn(
          ["data", widget, "dataSource", "dataConfig", type, "columns"],
          (field) => field.without(id)
        )
        .update("recordUpdate", (record) => [widget].concat(record)),

    [SET_SELECT_DATASET_ID]: (state, { id: { widget, select } }) =>
      state
        .setIn(["data", widget, "dataSource", "numberField"], [])
        .setIn(["data", widget, "dataSource", "stringField"], [])
        .setIn(["data", widget, "dataSource", "dataField"], [])
        .setIn(["data", widget, "dataSource", "datasetId"], select)
        .setIn(["data", widget, "temporary", "linkage"], {})
        .updateIn(["data", widget, "dataSource", "dataConfig"], (field) =>
          field == null
            ? null
            : Object.keys(field).reduce((newField, item) => {
                newField[item] = Object.assign({}, field[item]);
                newField[item].columns = {};
                return newField;
              }, {})
        )
        .update("recordUpdate", (record) => [widget].concat(record)),

    [LAYOUT_UPDATE_WIDGET_DATA]: (state, { id, data, newOption }) =>
      state
        .updateIn(["data", id, "option"], (option) =>
          newOption ? newOption : option
        )
        .setIn(["data", id, "option", "dataset"], { source: data }),

    [CONTROL_FILTER_ALERT_STATUS]: (state, { data }) =>
      state.set("filterAlertShow", data),

    [SET_WIDGET_DATA_FILTER]: (state, { data }) =>
      state
        .updateIn(["data", data.widget, "dataSource", "filters"], (all = {}) =>
          Object.assign({}, all, data.filter)
        )
        .set("filterAlertShow", false)
        .update("recordUpdate", (record) => [data.widget].concat(record)),

    [DELETE_WIDGET_FILTER_ITEM]: (state, { data }) =>
      state
        .setIn(["data", data.widget, "dataSource", "filters"], data.filters)
        .update("recordUpdate", (record) => [data.widget].concat(record)),

    [TEST_UPDATE_DATA_SWITCH]: (state, { data }) =>
      state.data[data.widget]
        ? state.setIn(
            ["data", data.widget, "dataSource", "testSwitch"],
            data.testSwitch
          )
        : state,

    [SET_REMOTE_RECEIVE_VALUE]: (
      state,
      { data: { id, field, value, drillLevel = "", linkage = {} } }
    ) => {
      return state.data[id]
        ? state
            .setIn(["data", id, "temporary", "linkage"], {})
            // .setIn(["data", id, "temporary", "linkage", field], {
            //   linkage: value
            // })
            .setIn(["data", id, "temporary", "linkage"], linkage)
            .setIn(["data", id, "dataSource", "drillLevel"], drillLevel)
        : state;
    },

    [SET_DATA_SORT_STATUS]: (
      state,
      { data: { sort, widget, typePath, index, id, type } }
    ) =>
      state
        .setIn(["data", widget, "dataSource", typePath, index, "sort"], sort)
        .setIn(
          [
            "data",
            widget,
            "dataSource",
            "dataConfig",
            type,
            "columns",
            id,
            "sort",
          ],
          sort
        ),
    [UPDATE_FODDER_ALERT_STATUS]: (state, { status }) =>
      state.set("fodder", status).set("contextmenu", {}),
    [DRAGE_WIDGET_DATA]: (state, { data, groupWidget }) =>
      state.set("data", data).set("groupWidget", groupWidget),
    [ADD_WIDGET_DATA_DRILL]: (state, { data: { widget, drillField } }) =>
      state
        .setIn(["data", widget, "dataSource", "drillField"], drillField)
        .update("recordUpdate", (record) => [widget].concat(record)),
  }),
  {
    limit: 6,
    filter: (action) => {
      const exp = /_STATE/;
      return exp.test(action.type);
    },
  }
);
