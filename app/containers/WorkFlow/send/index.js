import React from "react";

// components
import AddNode from "../addNode";

const Send = (props) => {
  const toText = (nodeConfig) => {
    if (nodeConfig.nodeUserList && nodeConfig.nodeUserList.length > 0) {
      const users = nodeConfig.nodeUserList.map((item) => item.name).join("、");
      return users;
    } else {
      if (nodeConfig.userSelectFlag) {
        return "发起人自选";
      } else {
        return false;
      }
    }
  };
  return (
    <div className="node-wrap">
      <div className="node-wrap-box">
        <div className="title" style={{ background: "#3296fa" }}>
          {/* <el-icon class="icon"><el-icon-promotion /></el-icon> */}
          <span>{props.nodeConfig.nodeName}</span>
          {/* <el-icon class="close" @click.stop="delNode()"><el-icon-close /></el-icon> */}
        </div>
        <div className="content">
          {toText(props.nodeConfig) ? (
            <span>{toText(props.nodeConfig)}</span>
          ) : (
            <span class="placeholder">请选择人员</span>
          )}
        </div>
      </div>
      <AddNode node={props.nodeConfig.childNode} />
    </div>
  );
};

export default Send;
