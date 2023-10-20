const config = {
  animation: false,
  tooltip: {
    trigger: "item",
    formatter: "{b}",
  },
  grid: {
    top: 100,
    left: "3%",
    right: "4%",
    bottom: 100,
    containLabel: true,
  },
  backgroundColor: "#ffffff",
  xAxis: [
    {
      show: false,
      type: "value",
      name: "下",
      nameGap: 85,
      nameLocation: "middle",
    },
    {
      show: false,
      type: "value",
      name: "上",
      nameLocation: "middle",
    },
  ],
  yAxis: {
    show: false,
    type: "value",
  },
  series: [
    {
      type: "graph",
      coordinateSystem: "cartesian2d",
      label: {
        normal: {
          show: false,
          position: "bottom",
          color: "#12b5d0",
          formatter: function (x) {
            return [
              `{name_po|${x.data.PositionName}}`,
              `{value_po|${x.data.svalue}}` + (x.data.alarm ? "{a|}" : ""),
            ].join("\n");
          },
          rich: {
            a: {
              align: "right",
              padding: [2, 2],
              verticalAlign: "middle",
            },
            name_po: {
              fontFamily: "MicrosoftYaHei",
              fontSize: "12px",
              fontweight: 400,
              color: "#0F284C",
              padding: [2, 2],
            },
            value_po: {
              padding: [4, 4],
              backgroundColor: "#fff",
              borderWidth: 0,
              fontFamily: "D-DIN",
              fontSize: "12px",
              fontweight: "bold",
              textAlign: "left",
              color: "#637381",
            },
          },
        },
      },
      data: [
        {
          name: "1009E",
          StationCode: "1009E",
          PositionName: "资产名称1",
          svalue: "192.168.34.1",
          x: 8,
          y: 1,
          symbolSize: [40, 40],
          symbol: `image://${require("./images/terminal.png")}`,
          value: [8, 1],
          label: {
            show: true,
            position: "bottom",
          },
        },
        {
          name: "1011E",
          StationCode: "1011E",
          PositionName: "资产名称2",
          svalue: "192.168.34.2",
          x: 508,
          y: 1,
          symbolSize: [40, 40],
          symbol: `image://${require("./images/terminal.png")}`,
          value: [508, 1],
          label: {
            show: true,
            position: "bottom",
          },
        },
        {
          name: "1018E",
          StationCode: "1018E",
          PositionName: "资产名称3",
          svalue: "192.168.34.3",
          x: 1008,
          y: 1,
          symbolSize: [40, 40],
          symbol: `image://${require("./images/terminal.png")}`,
          value: [1008, 1],
          label: {
            show: true,
            position: "bottom",
          },
        },
        {
          name: "1023E",
          StationCode: "1023E",
          PositionName: "资产名称4",
          svalue: "192.168.34.4",
          x: 1508,
          y: 1,
          symbolSize: [40, 40],
          symbol: `image://${require("./images/terminal.png")}`,
          value: [1508, 1],
          label: {
            show: true,
            position: "bottom",
          },
        },
        {
          name: "1013E",
          StationCode: "1013E",
          PositionName: "外网1",
          Storage_etra: 0,
          Storage: "类一",
          svalue: "9.192.168.1.2",
          x: 16,
          y: 13,
          alarm: null,
          symbolSize: [40, 40],
          symbol: `image://${require("./images/terminal.png")}`,
          value: [16, 13],
          label: {
            show: true,
            position: "top",
          },
        },
        {
          name: "10012E",
          StationCode: "10012E",
          PositionName: "外网2",
          Storage_etra: 0,
          Storage: "类一",
          svalue: "192.168.1.3",
          x: 416,
          y: 13,
          alarm: null,
          symbolSize: [40, 40],
          symbol: `image://${require("./images/terminal.png")}`,
          value: [416, 13],
          label: {
            show: true,
            position: "top",
          },
        },
        {
          name: "1010E",
          StationCode: "1010E",
          PositionName: "外网3",
          Storage_etra: 1,
          Storage: "类二",
          svalue: "192.168.1.4",
          x: 816,
          y: 13,
          symbolSize: [40, 40],
          symbol: `image://${require("./images/terminal_red.png")}`,
          value: [816, 13],
          label: {
            show: true,
            position: "top",
          },
        },
        {
          name: "1020E",
          StationCode: "1020E",
          PositionName: "外网4",
          Storage_etra: 2,
          Storage: "类三",
          svalue: "192.168.1.5",
          x: 1216,
          y: 13,
          symbolSize: [40, 40],
          symbol: `image://${require("./images/terminal.png")}`,
          value: [1216, 13],
          label: {
            show: true,
            position: "top",
          },
        },
        {
          name: "1019E",
          StationCode: "1019E",
          PositionName: "外网5",
          Storage_etra: 2,
          Storage: "类三",
          svalue: "192.168.1.6",
          x: 1616,
          y: 13,
          symbolSize: [40, 40],
          symbol: `image://${require("./images/terminal.png")}`,
          value: [1616, 13],
          label: {
            show: true,
            position: "top",
          },
        },
        {
          name: "1025E",
          StationCode: "1025E",
          PositionName: "外网6",
          Storage_etra: 3,
          Storage: "类四",
          svalue: "192.168.1.7",
          x: 2016,
          y: 13,
          symbolSize: [40, 40],
          symbol: `image://${require("./images/terminal_red.png")}`,
          value: [2016, 13],
          label: {
            show: true,
            position: "top",
          },
        },
        {
          name: "1024E",
          StationCode: "1024E",
          PositionName: "外网7",
          Storage_etra: 3,
          Storage: "类四",
          svalue: "192.168.1.8",
          x: 2416,
          y: 13,
          symbolSize: [40, 40],
          symbol: `image://${require("./images/terminal.png")}`,
          value: [2416, 13],
          label: {
            show: true,
            position: "top",
          },
        },
        {
          name: "1022E",
          StationCode: "1022E",
          PositionName: "外网8",
          Storage_etra: 3,
          Storage: "类四",
          svalue: "192.168.1.9",
          x: 2816,
          y: 13,
          symbolSize: [40, 40],
          symbol: `image://${require("./images/terminal.png")}`,
          value: [2816, 13],
          label: {
            show: true,
            position: "top",
          },
        },
      ],
      z: 4,
      itemStyle: {
        normal: {
          label: {
            show: true,
          },
        },
      },
    },
    {
      name: "line",
      type: "lines",
      coordinateSystem: "cartesian2d",
      z: 0,
      polyline: false,
      effect: {
        show: true,
        period: 8,
        trailLength: 0.3,
        symbolSize: 10,
        symbol: "pin",
        loop: true,
        //"color": "#1eaa2b"
      },
      lineStyle: {
        type: "solid",
        color: "#1F64FF",
        width: 1,
        opacity: 0.3,
        curveness: 0,
      },
      data: [
        [
          {
            coord: [8, 1],
          },
          {
            coord: [816, 13],
          },
        ],
        [
          {
            coord: [508, 1],
          },
          {
            coord: [416, 13],
          },
        ],
        [
          {
            coord: [508, 1],
          },
          {
            coord: [16, 13],
          },
        ],
        [
          {
            coord: [1008, 1],
          },
          {
            coord: [1616, 13],
          },
        ],
        [
          {
            coord: [1008, 1],
          },
          {
            coord: [1216, 13],
          },
        ],
        [
          {
            coord: [1508, 1],
          },
          {
            coord: [2816, 13],
          },
        ],
        [
          {
            coord: [1508, 1],
          },
          {
            coord: [2416, 13],
          },
        ],
        [
          {
            coord: [1508, 1],
          },
          {
            coord: [2016, 13],
          },
        ],
      ],
    },
  ],
};
export default config;
