import React from "react";

// components
import AddNode from "../addNode";

const Approver = (props) => {
  const toText = (nodeConfig) => {
    if (nodeConfig.setType == 1) {
      if (nodeConfig.nodeUserList && nodeConfig.nodeUserList.length > 0) {
        const users = nodeConfig.nodeUserList
          .map((item) => item.name)
          .join("、");
        return users;
      } else {
        return false;
      }
    } else if (nodeConfig.setType == 2) {
      return nodeConfig.examineLevel == 1
        ? "直接主管"
        : `发起人的第${nodeConfig.examineLevel}级主管`;
    } else if (nodeConfig.setType == 3) {
      if (nodeConfig.nodeRoleList && nodeConfig.nodeRoleList.length > 0) {
        const roles = nodeConfig.nodeRoleList
          .map((item) => item.name)
          .join("、");
        return "角色-" + roles;
      } else {
        return false;
      }
    } else if (nodeConfig.setType == 4) {
      return "发起人自选";
    } else if (nodeConfig.setType == 5) {
      return "发起人自己";
    } else if (nodeConfig.setType == 7) {
      return "连续多级主管";
    }
  };
  return (
    <div className="node-wrap">
      <div className="node-wrap-box">
        <div className="title" style={{ background: "#ff943e" }}>
          {/* <el-icon class="icon"><el-icon-user-filled /></el-icon> */}
          <span>{props.nodeConfig.nodeName}</span>
          {/* <el-icon class="close" @click.stop="delNode()"><el-icon-close /></el-icon> */}
        </div>
        <div className="content">
          {toText(props.nodeConfig) ? (
            <span>{toText(props.nodeConfig)}</span>
          ) : (
            <span className="placeholder">请选择</span>
          )}
        </div>
      </div>
      <AddNode node={props.nodeConfig.childNode} />
    </div>
  );
};

export default Approver;
