import React, { useEffect, useState } from "react";
import echarts from "echarts";
// option
import option from "./config";
// css
import "./style.scss";
const outreachAnalysis = (props) => {
  console.log(props, "props");
  useEffect(() => {
    const chartRef = document.querySelector("#outreachAnalysis");
    let chartInstance = null;
    if (chartRef) {
      chartInstance = echarts.init(chartRef);
      chartInstance.setOption(option);
    }
  }, []);
  return <div id="outreachAnalysis" className="outreach-analysis" />;
};
export default outreachAnalysis;
