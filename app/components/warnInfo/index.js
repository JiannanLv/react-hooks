import React, { useEffect, useState } from "react";
// api
import { getSrcIntelligenceDataApi } from "@/api";
// config
import { config } from "@/util/config";
// css
import "./style.scss";

const WarnInfo = (props) => {
  const [hitInfo, updateHitInfo] = useState({
    deptName: "",
    srcIp: null,
    attackType: "",
    srcArea: "·",
    cIPs: [],
    srcIntelligence: null,
    startTime: null,
    endTime: null,
  });
  const [rangeTime, updateRangeTime] = useState([]);
  const getSrcIntelligenceData = (rangeTime) => {
    getSrcIntelligenceDataApi({ rangeTime }).then((res) => {
      if (res.httpStatus === config.API_SUCCESS_CODE) {
        console.log(res, "res");
        updateHitInfo(res.entity);
      }
    });
  };
  const handleJump = () => {
    const jumpUrl = "/monitor/ThreatMonitoring/threatPerspective/detail";
    const paramsStr = `?threatId=${hitInfo.threatId}&ruleId=${hitInfo.ruleId}&rangeTime=${rangeTime}`;
    window.open(`${window.top.location.origin}/#${jumpUrl}${paramsStr}`);
  };
  useEffect(() => {
    console.log(props, "props");
    const { rangeTime = [] } = props.globalFilter;
    // const rangeTime = ["2023-07-23 15:23:10", "2023-08-23 15:23:10"];
    updateRangeTime(rangeTime);
    getSrcIntelligenceData(rangeTime);
  }, [props.globalFilter]);
  return (
    <div
      className={`warn-info ${hitInfo.srcIntelligence ? "warn-info-hit" : ""}`}
    >
      {hitInfo.srcIntelligence ? (
        <div className="warn-info-ip">
          <img className="warn-img" src={require("./images/warn.png")} />
          <p className="warn-ip" onClick={handleJump}>
            威胁IP: {hitInfo.srcIp}
          </p>
        </div>
      ) : (
        <div className="warn-info-tip">
          <img className="warn-img" src={require("./images/security.png")} />
          <p className="warn-text">未发现新威胁</p>
          <p className="warn-status">实时监测中</p>
        </div>
      )}

      {hitInfo.srcIntelligence ? (
        <ul className="warn-related-info">
          <li>
            <img src={require("./images/hit.png")} />
            <span>命中·威胁情报</span>
          </li>
          <li>
            <img src={require("./images/location.png")} />
            <span>{hitInfo.srcArea}</span>
          </li>
          <li>
            <img src={require("./images/organization.png")} />
            <span>组织·{hitInfo.deptName}</span>
          </li>
        </ul>
      ) : null}
      {hitInfo.srcIntelligence ? (
        <ul className="warn-info-detail">
          <li>
            <img src={require("./images/point.png")} />
            <span>攻击类型: {hitInfo.attackType}</span>
          </li>
          <li>
            <img src={require("./images/point.png")} />
            <span>首次攻击时间: {hitInfo.startTime}</span>
          </li>
          <li>
            <img src={require("./images/point.png")} />
            <span title={hitInfo.cIPs.toString()}>
              同C段IP:{" "}
              {hitInfo.cIPs.map((x, xIndex) => {
                if (xIndex === hitInfo.cIPs.length - 1) {
                  return <span>{x} </span>;
                } else {
                  return <span>{x} /</span>;
                }
              })}
            </span>
          </li>
          <li>
            <img src={require("./images/point.png")} />
            <span>末次攻击时间: {hitInfo.endTime}</span>
          </li>
        </ul>
      ) : null}
    </div>
  );
};

export default WarnInfo;
