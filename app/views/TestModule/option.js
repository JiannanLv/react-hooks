/*
 * @Author: wangc
 * @Date: 2018-08-23 19:12:16
 * @LastEditors: wangc
 * @LastEditTime: 2019-03-12 11:27:01
 * @Description: 
 * @Email: wangcheng@hiynn.com
 */
let tableConfig = {
  animation: {
    show: true,
    time: 500,
    pauseTime: 1500,
    fullRolling: false //是否滚动全屏
  },
  row: 6, // 一屏幕显示多少个
  headerShow: true, // 头部是否显示
  headerStyle: {
    height: "15%", // 高度
    width: "100%", // 宽度
    backgroundColor: "#4c4b50", // 背景色
    alignItems: "center", // 文字垂直居中
    textAlign: "center" // 文字垂直居
  },
  constentStyle: {
    fontFamily: "微软雅黑"
  },
  singularLine: {
    // 单数行样式
    backgroundColor: "rgba(0,0,0,0.1)"
  },
  pluralLine: {
    // 复数行样式
    backgroundColor: "rgba(0,0,0,0.2)"
  },
  mark: {
    name: "排名",
    show: true,
    showIcon: true,
    icon: "/dashboard/images/thumbnail.png",
    imgStyle: {
      position: "absolute",
      transform: "translate(-50%,-50%)",
      left: "50%",
      top: "50%",
      zIndex: -1,
      width: 20,
      height: 20
    },
    style: {
      width: "20%",
      color: "#c21",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative"
    }
  },
  headerSeries: [
    {
      key: "area",
      value: "",
      nodeType: "text",
      heaederStyle: {
        width: "20%",
        color: "#fff",
        fontSize: "14px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      },
      columnStyle: {
        color: "#fff"
      }
    },
    {
      key: "pv",
      value: "",
      nodeType: "img",
      imgStyle: {
        width: 30,
        height: 30
      },
      heaederStyle: {
        width: "20%",
        color: "#fff",
        fontSize: "14px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      },
      columnStyle: {
        color: "#fff"
      }
    },
    {
      key: "attribute",
      value: "",
      nodeType: "text",
      heaederStyle: {
        width: "40%",
        color: "#fff",
        fontSize: "14px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      },
      columnStyle: {
        color: "#fff"
      }
    }
  ],
  dataset: {
    source: [
      ["area", "pv", "attribute"],
      ["1-1", "/dashboard/images/thumbnail.png", "3-1"],
      ["1-2", "/dashboard/images/thumbnail.png", "3-2"],
      ["1-3", "/dashboard/images/thumbnail.png", "3-3"],
      ["1-4", "/dashboard/images/thumbnail.png", "3-4"],
      ["1-5", "/dashboard/images/thumbnail.png", "3-5"],
      ["1-6", "/dashboard/images/thumbnail.png", "3-6"],
      ["1-7", "/dashboard/images/thumbnail.png", "3-7"],
      ["1-8", "/dashboard/images/thumbnail.png", "3-8"],
      ["1-9", "/dashboard/images/thumbnail.png", "3-9"],
      ["1-10", "/dashboard/images/thumbnail.png", "3-10"]
    ]
  }
};
export default {
  style: {
    width: 450,
    height: 450
  },
  menuBan: ["color", "senior"],
  dataSource: {
    dataField: [],
    datasetId: {},
    dataConfig: {
      值: {
        dataType: "all",
        count: 20,
        columns: {},
        required: true
      }
    },
    filters: {},
    refresh: null
  },
  option: tableConfig,
  events: {}
};
