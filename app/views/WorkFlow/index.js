import React, { useState, useEffect } from "react";

// containers
import ScWorkFlow from "@/containers/WorkFlow";

// initData
import { initData } from "./public/data";

// css
import "./style.scss";

const WorkFlow = () => {
  const [stateData, updateStateData] = useState(initData || {});
  console.log(stateData, "stateData");

  // useEffect(() => {
  //   updateStateData(initData);
  // }, []);
  return (
    <div className="work-flow-container">
      <ScWorkFlow data={stateData.nodeConfig} />
    </div>
  );
};

export default WorkFlow;
