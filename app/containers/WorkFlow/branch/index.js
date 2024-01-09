import React from "react";
import { Button } from "antd";
import { LeftOutlined, CloseOutlined, RightOutlined } from "@ant-design/icons";

// components
import AddNode from "../addNode";
import NodeWrap from "../nodeWrap";

// css
import "./style.scss";

const Branch = (props) => {
  console.log(props, "props-branch");
  const toText = (nodeConfig, index) => {
    const { conditionList } = nodeConfig.conditionNodes[index];
    if (conditionList && conditionList.length == 1) {
      const text = conditionList
        .map((conditionGroup) =>
          conditionGroup.map(
            (item) => `${item.label}${item.operator}${item.value}`
          )
        )
        .join(" 和 ");
      return text;
    } else if (conditionList && conditionList.length > 1) {
      return conditionList.length + "个条件，或满足";
    } else {
      if (index == nodeConfig.conditionNodes.length - 1) {
        return "其他条件进入此流程";
      } else {
        return false;
      }
    }
  };
  return (
    <div className="branch-wrap">
      <div className="branch-box-wrap">
        <div className="branch-box">
          <Button className="add-branch" type="success" shape="round">
            添加条件
          </Button>
          {props.nodeConfig.conditionNodes.map((item, index) => {
            return (
              <div className="col-box" key={index}>
                <div className="condition-node">
                  <div className="condition-node-box">
                    <div className="auto-judge">
                      {index !== 0 ? (
                        <div className="sort-left">
                          <LeftOutlined />
                        </div>
                      ) : null}
                      <div className="title">
                        <span className="node-title">{item.nodeName}</span>
                        <span className="priority-title">
                          优先级{item.priorityLevel}
                        </span>
                        <CloseOutlined className="close" />
                      </div>
                      <div className="content">
                        {toText(props.nodeConfig, index) ? (
                          <span>{toText(props.nodeConfig, index)}</span>
                        ) : (
                          <span className="placeholder">请设置条件</span>
                        )}
                      </div>
                      {index != props.nodeConfig.conditionNodes.length - 1 ? (
                        <div className="sort-right">
                          <RightOutlined />
                        </div>
                      ) : null}
                    </div>
                    <AddNode node={item.childNode} />
                  </div>
                </div>
                {item.childNode ? (
                  <NodeWrap nodeConfig={item.childNode} />
                ) : null}
                {index === 0 ? <div className="top-left-cover-line" /> : null}
                {index === 0 ? (
                  <div className="bottom-left-cover-line" />
                ) : null}
                {index === props.nodeConfig.conditionNodes.length - 1 ? (
                  <div className="top-right-cover-line" />
                ) : null}
                {index === props.nodeConfig.conditionNodes.length - 1 ? (
                  <div className="bottom-right-cover-line" />
                ) : null}
              </div>
            );
          })}
        </div>
        <AddNode node={props.nodeConfig.childNode} />
      </div>
    </div>
  );
};

export default Branch;
