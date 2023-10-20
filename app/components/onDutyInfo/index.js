import React, { useEffect, useState, useRef } from "react";
// api
import { getDutyInfoApi } from "@/api";
// config
import { config } from "@/util/config";
// css
import "./style.scss";

const OnDutyInfo = (props) => {
  const [dutyInfo, updateDutyInfo] = useState([]);
  const [rangeTime, updateRangeTime] = useState([]);
  const nodeHeight = `${100 / 6}%`;
  const nodeBox = useRef();
  const statusEnum = {
    0: "未签到",
    1: "已签到",
    2: "已签退",
  };
  let nodeIndex = 0;
  let refDom = null;
  let timer = null;
  let nowNode = null;
  let timeOut = null;
  const getDutyInfo = (rangeTime) => {
    const params = {
      startTime: rangeTime[0],
      endTime: rangeTime[1],
    };
    getDutyInfoApi(params).then((res) => {
      if (res.httpStatus === config.API_SUCCESS_CODE) {
        updateDutyInfo(res.entity);
        if (res.entity.length) {
          addHandleTimer();
        }
      }
    });
  };
  const handleJump = (value) => {
    const jumpUrl = "/assetmanagement/AManagement/sstAssetManage";
    const paramsStr = `?assetType=${value}`;
    window.open(`${window.top.location.origin}/#${jumpUrl}${paramsStr}`);
  };
  const addHandleTimer = () => {
    refDom = document.querySelector("#onDutyInfoTable");
    timer = setInterval(transformFunc, 3000);
  };
  const transformFunc = () => {
    nowNode = refDom.childNodes[nodeIndex];
    if (!nowNode) {
      // console.error(`表格控件动画有问题请检查！`);
      return;
    }
    nowNode.style.transition = `height 700ms`;
    nowNode.style.height = `0px`;
    nowNode.style["border-bottom"] = `none`;
    nowNode.style["margin-bottom"] = `0px`;
    nodeIndex += 1;
    timeOut = setTimeout(reSetLayout, 700);
  };
  const reSetLayout = () => {
    let cloneNode = nowNode.cloneNode(true);
    cloneNode.style.transition = "none";
    cloneNode.style.height = nodeHeight;
    cloneNode.style["border-bottom"] = "1px solid rgba(205, 225, 253, 0.1)";
    cloneNode.classList.add("NANI");
    refDom.appendChild(cloneNode);
    // if (nodeIndex == dutyInfo.length - 1) {
    //   nodeIndex = 0;
    //   removeHandleTimer();
    //   addHandleTimer();
    // }
  };
  const removeHandleTimer = () => {
    timer && clearInterval(timer);
    timeOut && clearTimeout(timeOut);
    removeNode();
  };
  const removeNode = () => {
    let interimNode = (refDom && refDom.querySelectorAll(".group.NANI")) || [];
    for (let i = 0; i < interimNode.length; i++) {
      refDom.removeChild(interimNode[i]);
    }
  };
  const renderChildNode = (node) => {
    const header = ["userName", "userTel", "status"];
    return header.map((v, i) => {
      return (
        <div className="word-brank" key={`contentChild_${i}`} title={node[v]}>
          {v === "status" ? statusEnum[node[v]] : node[v]}
        </div>
      );
    });
  };
  const renderNode = () => {
    const random = Math.random();
    return (dutyInfo || []).map((v, i) => {
      return (
        <li
          style={Object.assign({ height: nodeHeight })}
          key={`tableNode-${i}-${random}`}
          className="group"
        >
          {renderChildNode(v)}
        </li>
      );
    });
  };
  useEffect(() => {
    console.log(props, "props");
    const { rangeTime = [] } = props.globalFilter;
    // const rangeTime = ["2023-06-14 17:59:18", "2023-06-21 17:59:18"];
    getDutyInfo(rangeTime);
    updateRangeTime(rangeTime);
  }, [props.globalFilter]);
  return (
    <div className="on-duty-info">
      <div className="on-duty-info-table" id="onDutyInfoTable" ref={nodeBox}>
        {renderNode()}
      </div>
    </div>
  );
};

export default OnDutyInfo;
