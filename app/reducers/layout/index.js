import immutable from "seamless-immutable";
import undoable from "redux-undo";

import createReducer from "@/util/createReducer";
import { ADD_NEW_WIDGET_STATE } from "@/actions/layoutAction";

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
    [ADD_NEW_WIDGET_STATE]: (state, { data }) =>
      state
        .merge({ data }, { deep: true })
        .update("recordAdd", (record) => Object.keys(data).concat(record)),
  }),
  {
    limit: 6,
    filter: (action) => {
      const exp = /_STATE/;
      return exp.test(action.type);
    },
  }
);
