var config = {
  color: [
    "#A0DEFE",
    "#4EA1C2",
    "#2ABACB",
    "#31C4F4",
    "#223A70",
    "#2CA9F2",
    "#2586E0",
    "#1D67C4",
  ],
  valueMax: "auto", //'auto' 'sum' [number]
  itemWidth: 10,
  opacityItem: {
    label: {
      show: false,
    },
    labelLine: {
      show: false,
    },
    itemStyle: {
      color: "rgba(22, 22, 22, 0.1)",
      borderColor: "rgba(0, 0, 0, 0)",
      // borderWidth: 0
    },
  },
  tooltip: {
    show: false,
  },
  legend: {
    show: false,
  },
  dataset: {
    source: [
      ["维度", "值"],
      ["2月", 900],
      ["6月", 500],
      ["8月", 200],
    ],
  },
  series: [
    {
      type: "pie",
      clockWise: false,
      radius: ["50%", "60%"],
      hoverAnimation: true,
      label: {
        show: true,
        position: "outside",
        formatter: "{b}:{c}\n {d}%",
        borderColor: "#c21",
        padding: [5, 15, 5, 15],
        borderWidth: 2,
        rich: {},
      },
      labelLine: {
        show: true,
        length: 20,
        length2: 40,
      },
    },
  ],
};

export default {
  style: {
    width: 400,
    height: 400,
  },
  dataSource: {
    dataField: [],
    datasetId: {},
    dataConfig: {
      维度: {
        dataType: "string",
        count: 1,
        columns: {},
        required: true,
      },
      度量: {
        dataType: "number",
        count: 1,
        columns: {},
        required: false,
      },
    },
    filters: {},
    refresh: null,
  },
  option: config,
  events: {},
};
