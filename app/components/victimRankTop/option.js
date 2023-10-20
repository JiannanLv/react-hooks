const initConfig = {
  jump: {
    show: false,
    url: "",
    transfer: false,
  },
};
export default {
  style: {
    width: 688,
    height: 402,
  },
  menuBan: ["color", "senior"],
  dataSource: {
    dataField: [],
    datasetId: {},
    dataConfig: {
      "水平轴/维度": {
        dataType: "string",
        count: 1,
        columns: {},
        required: true,
      },
      "垂直轴/度量": {
        dataType: "number",
        count: 20, //说明可以无限拖数据
        columns: {},
        required: true,
      },
    },
    filters: {},
    refresh: null,
  },
  option: initConfig,
  events: {},
};
