import createAction from "@/util/createAction";

// 新添加图表
export const ADD_NEW_WIDGET = "ADD_NEW_WIDGET";
export const ADD_NEW_WIDGET_STATE = "ADD_NEW_WIDGET_STATE";

// 拖拽业务组件更新图表
export const DRAGE_WIDGET = "DRAGE_WIDGET";
export const DRAGE_WIDGET_DATA = "DRAGE_WIDGET_DATA";

// 新添加模板图表
export const ADD_TEMPLATE_WIDGET = "ADD_TEMPLATE_WIDGET";

//新添加素材控件
export const ADD_FODDER_WIDGET = "ADD_FODDER_WIDGET";

// 修改多个图表的配置
export const CHANGE_GROUP_STATE = "CHANGE_GROUP_STATE";

// 添加x轴线条
export const ADD_NEW_XLINE = "ADD_NEW_XLINE";
export const UPDATE_XLINE_STATE = "UPDATE_XLINE_STATE";

// 删除x轴线条
export const DELETE_XLINE_STATE = "DELETE_XLINE_STATE";

// 添加y轴线条
export const ADD_NEW_YLINE = "ADD_NEW_YLINE";
export const UPDATE_YLINE_STATE = "UPDATE_YLINE_STATE";

// 删除y轴线条
export const DELETE_YLINE_STATE = "DELETE_YLINE_STATE";

// 修改控件配置
export const SET_WIDGET_DATA = "SET_WIDGET_DATA";
export const SET_WIDGET_DATA_STATE = "SET_WIDGET_DATA_STATE";

// 删除图表
export const DELETE_WIDGET_STATE = "DELETE_WIDGET_STATE";

// 选择图表
export const SELECT_WIDGET = "SELECT_WIDGET";
export const SELECT_WIDGET_CONTROL = "SELECT_WIDGET_CONTROL";

// 修改菜单栏显示
export const SET_MENU_DRAWER_CONTROL = "SET_MENU_DRAWER_CONTROL";

// 显示图表编辑
export const SHOW_WIDGET_EDIT_CONTROL = "SHOW_WIDGET_EDIT_CONTROL";

// 显示页面元素列表
export const SHOW_NAME_LIST_CONTROL = "SHOW_NAME_LIST_CONTROL";

// 拖拽多选
export const DRAG_SELECT_EVEN = "DRAG_SELECT_EVEN";
export const DRAG_SELECT_EVEN_CONTROL = "DRAG_SELECT_EVEN_CONTROL";

// ctrl点击多选
export const KEY_SELECT_EVEN_CONTROL = "KEY_SELECT_EVEN_CONTROL";

// 多选后的编组
export const WIDGET_EVEN_GROUP = "WIDGET_EVEN_GROUP";
export const WIDGET_EVEN_GROUP_STATE = "WIDGET_EVEN_GROUP_STATE";

// 多选后的打散
export const OPEN_EVEN_GROUP = "OPEN_EVEN_GROUP";
export const OPEN_EVEN_GROUP_STATE = "OPEN_EVEN_GROUP_STATE";

// 多选后的拖动
export const DRAG_EVEN_GROUP = "DRAG_EVEN_GROUP";
export const DRAG_EVEN_GROUP_CONTROL = "DRAG_EVEN_GROUP_CONTROL";

// 多选后的删除
export const DELETE_EVEN_WIDGET_STATE = "DELETE_EVEN_WIDGET_STATE";

// 编组后的删除
export const DELETE_GROUP_WIDGET_STATE = "DELETE_GROUP_WIDGET_STATE";

// 画布拖拽区的点击事件
export const DRAWREGION_CLICK_CONTROL = "DRAWREGION_CLICK_CONTROL";

// 更新页面中的ID
export const UPDATE_PROJECT_PAGE_ID = "UPDATE_PROJECT_PAGE_ID";

// 画布拖拽区的点击事件
export const CONTEXTMENU_CONTROL = "CONTEXTMENU_CONTROL";

// 用来添加撤销事件的操作
export const APP_UNDO_STATE = "APP_UNDO_STATE";

// 修改复制的ID
export const SET_COPY_ID_CONTROL = "SET_COPY_ID_CONTROL";

// 粘贴复制的控件到页面中
export const PASTE_COPY_WIDGET = "PASTE_COPY_WIDGET";

// 网格控制显隐状态
export const CANVAS_GRID_CONTROL = "CANVAS_GRID_CONTROL";

// 标尺控制显隐状态
export const SCALE_PLATE_CONTROL = "SCALE_PLATE_CONTROL";

// 多选状态下的左对齐
export const ALIGN_WIDGET_LEFT = "ALIGN_WIDGET_LEFT";

// 多选状态下的右对齐
export const ALIGN_WIDGET_RIGHT = "ALIGN_WIDGET_RIGHT";

// 多选状态下的水平居中
export const ALIGN_WIDGET_CENTER = "ALIGN_WIDGET_CENTER";

// 多选状态下的顶部对齐
export const VERTICAL_WIDGET_TOP = "VERTICAL_WIDGET_TOP";

// 多选状态下的底部对齐
export const VERTICAL_WIDGET_BOTTOM = "VERTICAL_WIDGET_BOTTOM";

// 多选状态下的垂直居中
export const VERTICAL_WIDGET_CENTER = "VERTICAL_WIDGET_CENTER";

// 多选状态下的水平分布
export const DISTRIBU_WIDGET_LEVEL = "DISTRIBU_WIDGETLEVEL";

// 多选状态下的垂直分布
export const DISTRIBU_WIDGET_ERECT = "DISTRIBU_WIDGET_ERECT";

// 页面打开获取数据
export const GET_PAGE_WIDGET = "GET_PAGE_WIDGET";
export const GET_PAGE_WIDGET_DATA = "GET_PAGE_WIDGET_DATA";

// 编组控件数据记录
export const EVEN_GROUP_RECORD = "EVEN_GROUP_RECORD";

// 保存页面数据
export const SAVE_PAGE_WIDGET = "SAVE_PAGE_WIDGET";
export const SAVE_PAGE_WIDGET_DATA = "SAVE_PAGE_WIDGET_DATA";

// 修改配件层级
export const SET_WIDGET_LAYER = "SET_WIDGET_LAYER";
export const SET_WIDGET_LAYER_STATE = "SET_WIDGET_LAYER_STATE";

// 设置页面数据
export const SET_PAGE_WIDGET = "SET_PAGE_WIDGET";

// 设置是否可编辑
export const SET_DRAGBOL_EDIT = "SET_DRAGBOL_EDIT";

// 锁定编组控件
export const LOCK_GROUP_WIDGET = "LOCK_GROUP_WIDGET";

// 更新控件数据

// 提交为模板控件
export const TEMPLATE_WIDGET = "TEMPLATE_WIDGET";
export const TEMPLATE_WIDGET_DATA = "TEMPLATE_WIDGET_DATA";

// 更新控件的数据
export const UPDATE_WIDGET_DATA = "UPDATE_WIDGET_DATA";
export const LAYOUT_UPDATE_WIDGET_DATA = "LAYOUT_UPDATE_WIDGET_DATA";

// 添加控件的数据字段
export const ADD_WIDGET_DATA_FIELD = "ADD_WIDGET_DATA_FIELD";
export const ADD_WIDGET_DATA_FIELD_SAGA = "ADD_WIDGET_DATA_FIELD_SAGA";

// 控制过滤字段弹框显隐
export const CONTROL_FILTER_ALERT_STATUS = "CONTROL_FILTER_ALERT_STATUS";

// 设置控件的过滤字段
export const SET_WIDGET_DATA_FILTER = "SET_WIDGET_DATA_FILTER";

// 删除控件的过滤字段
export const DELETE_WIDGET_FILTER_ITEM = "DELETE_WIDGET_FILTER_ITEM";

// 设置控件数据的排序状态
export const SET_DATA_SORT_STATUS = "SET_DATA_SORT_STATUS";

// 删除控件的数据字段
export const REMOVE_WIDGET_DATA_FIELD = "REMOVE_WIDGET_DATA_FIELD";
export const REMOVE_WIDGET_DATA_FIELD_SAGA = "REMOVE_WIDGET_DATA_FIELD_SAGA";

// 修改选中数据集ID
export const SET_SELECT_DATASET_ID = "SET_SELECT_FIELD_ID";

// 截图并 保存缩略图
export const SAVE_SMALL_IMAGE = "SAVE_SMALL_IMAGE";

// 测试数据
export const TEST_UPDATE_DATA_SWITCH = "TEST_UPDATE_DATA_SWITCH";

// 修改被控制控件的参数
export const SET_REMOTE_RECEIVE_VALUE = "SET_REMOTE_RECEIVE_VALUE";

// 手动修改dataset
export const CLUMSY_UPDATE_DATASET = "CLUMSY_UPDATE_DATASET";

// 撤销后与之前的state比对
export const UNDO_COMPARISON = "UNDO_COMPARISON";
export const UNDO_COMPARISON_SAGA = "UNDO_COMPARISON_SAGA";

// 回退后与之前的state比对
export const REDO_COMPARISON = "REDO_COMPARISON";
export const REDO_COMPARISON_SAGA = "REDO_COMPARISON_SAGA";

// 修改页面缩放比例
export const SET_LAYOUT_SCALE_CONTROL = "SET_LAYOUT_SCALE_CONTROL";

// 更新添加至素材组弹框显示状态
export const UPDATE_FODDER_ALERT_STATUS = "UPDATE_FODDER_ALERT_STATUS";

// 添加控件的数据钻取字段
export const ADD_WIDGET_DATA_DRILL = "ADD_WIDGET_DATA_DRILL";
// export const ADD_WIDGET_DATA_DRILL_SAGA = "ADD_WIDGET_DATA_DRILL_SAGA";

export const testUpdateDataSwitch = createAction(
  TEST_UPDATE_DATA_SWITCH,
  "data"
);

export const setRemoteReceiveValue = createAction(
  SET_REMOTE_RECEIVE_VALUE,
  "data"
);

export const redoComparison = createAction(REDO_COMPARISON);

export const undoComparison = createAction(UNDO_COMPARISON);

export const setLayoutScale = createAction(SET_LAYOUT_SCALE_CONTROL, "scale");

export const clumsyUpdateDataset = createAction(CLUMSY_UPDATE_DATASET, "data");

export const setSelectDatasetId = createAction(SET_SELECT_DATASET_ID, "id");

export const getPageWidget = createAction(GET_PAGE_WIDGET, "id");

export const evenGroupRecord = createAction(EVEN_GROUP_RECORD, "group");

export const savePageWidget = createAction(SAVE_PAGE_WIDGET, "mode", "cb");

export const setPageWidget = createAction(SET_PAGE_WIDGET, "data");

export const setCopyWidgetId = createAction(SET_COPY_ID_CONTROL, "id");

export const setWidgetLayer = createAction(SET_WIDGET_LAYER, "mode");

export const keySelectEven = createAction(KEY_SELECT_EVEN_CONTROL, "group");

export const pasteCopyWidget = createAction(PASTE_COPY_WIDGET, "id");

export const appUndoState = createAction(APP_UNDO_STATE);

export const addNewWidget = createAction(ADD_NEW_WIDGET, "data");
export const drageWidgeBusinessCom = createAction(DRAGE_WIDGET, "data");

export const addTemplateWidget = createAction(ADD_TEMPLATE_WIDGET, "data");

export const addFodderWidget = createAction(ADD_FODDER_WIDGET, "data");

export const addNewXLine = createAction(ADD_NEW_XLINE, "data");

export const addNewYLine = createAction(ADD_NEW_YLINE, "data");

export const setWidgetData = createAction(SET_WIDGET_DATA, "data");

export const deleteWidget = createAction(DELETE_WIDGET_STATE, "id");

export const deleteXlineState = createAction(DELETE_XLINE_STATE, "id");

export const deleteYlineState = createAction(DELETE_YLINE_STATE, "id");

export const selectWidgetAction = createAction(SELECT_WIDGET, "id", "force");

export const setMenuDrawer = createAction(SET_MENU_DRAWER_CONTROL, "data");

export const showWidgetEdit = createAction(SHOW_WIDGET_EDIT_CONTROL, "data");

export const showWidgetNameList = createAction(SHOW_NAME_LIST_CONTROL, "data");

export const dragSelectEven = createAction(DRAG_SELECT_EVEN, "data");

export const widgetEvenGroup = createAction(WIDGET_EVEN_GROUP);

export const openEvenGroup = createAction(OPEN_EVEN_GROUP);

export const dragEvenGroup = createAction(DRAG_EVEN_GROUP, "data");

export const deleteEvenWidget = createAction(DELETE_EVEN_WIDGET_STATE, "id");

export const deleteGroupWidget = createAction(DELETE_GROUP_WIDGET_STATE, "id");

export const drawregionClickAction = createAction(DRAWREGION_CLICK_CONTROL);

export const contextmenuAction = createAction(CONTEXTMENU_CONTROL, "data");

export const canvasGridControl = createAction(CANVAS_GRID_CONTROL, "data");

export const scalePlateControl = createAction(SCALE_PLATE_CONTROL, "data");

export const updateProjectPageId = createAction(
  UPDATE_PROJECT_PAGE_ID,
  "spaceId",
  "pageId"
);

export const alignWidgetLeft = createAction(ALIGN_WIDGET_LEFT);

export const alignWidgetRight = createAction(ALIGN_WIDGET_RIGHT);

export const alignWidgetCenter = createAction(ALIGN_WIDGET_CENTER);

export const verticalWidgetTop = createAction(VERTICAL_WIDGET_TOP);

export const verticalWidgetBottom = createAction(VERTICAL_WIDGET_BOTTOM);

export const verticalWidgetCenter = createAction(VERTICAL_WIDGET_CENTER);

export const distribuWidgetLevel = createAction(DISTRIBU_WIDGET_LEVEL);

export const distribuWidgetErect = createAction(DISTRIBU_WIDGET_ERECT);

export const setDragbolState = createAction(SET_DRAGBOL_EDIT, "data");

export const lockGroupWidget = createAction(LOCK_GROUP_WIDGET);

export const templateWidget = createAction(TEMPLATE_WIDGET, "id");

export const updateWidgetData = createAction(UPDATE_WIDGET_DATA, "data");

export const addWidgetDataField = createAction(ADD_WIDGET_DATA_FIELD, "data");

export const setWidgetDataFilter = createAction(SET_WIDGET_DATA_FILTER, "data");

export const deleteWidgetFilterItem = createAction(
  DELETE_WIDGET_FILTER_ITEM,
  "data"
);

export const controlFilterAlertStatus = createAction(
  CONTROL_FILTER_ALERT_STATUS,
  "data"
);

export const setDataSortStatus = createAction(SET_DATA_SORT_STATUS, "data");

export const saveSmallImage = createAction(SAVE_SMALL_IMAGE, "id", "img");

export const removeWidgetDataField = createAction(
  REMOVE_WIDGET_DATA_FIELD,
  "data"
);
export const updateFodderAlertStatus = createAction(
  UPDATE_FODDER_ALERT_STATUS,
  "status"
);

export const addWidgetDataDrill = createAction(ADD_WIDGET_DATA_DRILL, "data");
