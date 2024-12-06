import React, { useState, useRef } from "react";

// context
import Context from "./context";

// components
import NodeWrap from "./nodeWrap";
import UseSelect from "./useSelect";

// css
import "./style.scss";

const WorkFlow = (props) => {
  console.log(props, "props-sc-work-flow");
  const useSelectRef = useRef(null);
  const [nodeConfig, updateNodeConfig] = useState(props.data || {});
  const handleSelectRole = (type, data) => {
    useSelectRef.current.show(type, data);
  };
  console.log(nodeConfig, "sc-work-flow-node-config");
  return (
    <div className="workflow-design">
      <div className="workflow-design-box-scale">
        <Context.Provider value={{ select: handleSelectRole }}>
          <NodeWrap nodeConfig={nodeConfig} />
        </Context.Provider>
        <div class="end-node">
          <div class="end-node-circle"></div>
          <div class="end-node-text">流程结束</div>
        </div>
      </div>
      <UseSelect ref={useSelectRef} />
    </div>
  );
};

export default WorkFlow;
