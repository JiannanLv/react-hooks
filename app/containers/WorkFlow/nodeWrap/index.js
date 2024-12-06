import React, { useState } from "react";

//components
import Approver from "../approver";
import Promoter from "../promoter";
import Branch from "../branch";
import Send from "../send";

const NodeWrap = (props) => {
  const [nodeConfig, updateNodeConfig] = useState(props.nodeConfig);
  console.log(nodeConfig, "nodeConfig-node-wrap");
  return (
    <React.Fragment>
      {nodeConfig.type === 0 ? <Promoter nodeConfig={nodeConfig} /> : null}
      {nodeConfig.type === 1 ? <Approver nodeConfig={nodeConfig} /> : null}
      {nodeConfig.type === 2 ? <Send nodeConfig={nodeConfig} /> : null}
      {nodeConfig.type === 4 ? <Branch nodeConfig={nodeConfig} /> : null}
      {nodeConfig.childNode ? (
        <NodeWrap nodeConfig={nodeConfig.childNode} />
      ) : null}
    </React.Fragment>
  );
};

export default NodeWrap;
