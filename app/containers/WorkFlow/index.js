import React, { useState, useEffect } from "react";

// components
import NodeWrap from "./nodeWrap";
import UseSelect from "./useSelect";

// css
import "./style.scss";

const WorkFlow = (props) => {
  console.log(props, "props-sc-work-flow");
  const [nodeConfig, updateNodeConfig] = useState(props.data || {});

  // useEffect(() => {
  //   console.log(props.data, "props.data");
  //   updateNodeConfig(props.data);
  // }, [props]);
  console.log(nodeConfig, "sc-work-flow-node-config");
  return (
    <div className="workflow-design">
      <div className="workflow-design-box-scale">
        <NodeWrap nodeConfig={nodeConfig} />
        <div class="end-node">
          <div class="end-node-circle"></div>
          <div class="end-node-text">流程结束</div>
        </div>
      </div>
      <UseSelect />
    </div>
  );
};

export default WorkFlow;
