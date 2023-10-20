import React, { useEffect, useState } from "react";
import { Empty } from "antd";
import { transformUrl } from "@/util/util";

// css
import "./style.scss";

const VictimRankTop = (props) => {
  const [topList, updateTopList] = useState([
    ["192.168.1.1", 50],
    ["192.168.1.2", 40],
    ["192.168.1.3", 30],
    ["192.168.1.4", 20],
    ["192.168.1.5", 10],
  ]);
  const [stateJump, updateJump] = useState({
    show: false,
    transfer: false,
    url: "",
  });
  const [stateFilter, updateFilter] = useState({});
  useEffect(() => {
    const {
      config = {},
      config: { jump = {} },
      globalFilter = {},
    } = props;
    const propsJump = { ...jump };
    updateJump(propsJump);
    updateFilter(globalFilter);
    console.log(props, "props——111111111111", jump);
    if (!config.dataset) return;
    const { source = [] } = config.dataset;
    updateTopList(source.slice(1));
  }, [props]);
  const handleJump = (ip) => {
    let paramsStr = "";
    if (stateJump.show) {
      if (stateJump.transfer) {
        const jumpConfig = transformUrl(stateJump.url);
        paramsStr += `?dstIp=${ip}`;
        if (Object.keys(jumpConfig.params).length) {
          Object.keys(jumpConfig.params).forEach((key) => {
            paramsStr += `&${key}=${jumpConfig.params[key]}`;
          });
        }
        if (Object.keys(stateFilter).length) {
          Object.keys(stateFilter).forEach((key) => {
            paramsStr += `&${key}=${stateFilter[key]}`;
          });
        }
        window.open(
          `${window.top.location.origin}/#${jumpConfig.origin}${paramsStr}`
        );
      } else {
        if (Object.keys(stateFilter).length) {
          if (stateJump.url.indexOf("?") >= 0) {
            Object.keys(stateFilter).forEach((key) => {
              paramsStr += `&${key}=${stateFilter[key]}`;
            });
          } else {
            Object.keys(stateFilter).forEach((key, index) => {
              if (index === 0) {
                paramsStr += `?${key}=${stateFilter[key]}`;
              } else {
                paramsStr += `&${key}=${stateFilter[key]}`;
              }
            });
          }
        }
        window.open(
          `${window.top.location.origin}/#${stateJump.url}${paramsStr}`
        );
      }
    }
  };
  return (
    <React.Fragment>
      {/* {topList.length ? ( */}
      <div className="victim-rank-top">
        <div className="victim-rank-center" />
        {topList.map((x, xIndex) => {
          return (
            <div
              className={`victim-rank-item victim-rank-item-${xIndex}`}
              onClick={() => handleJump(x[0])}
            >
              <img src={require(`./images/top${xIndex + 1}.png`)} />
              <span>
                {x[0]} ( {x[1]} )
              </span>
            </div>
          );
        })}
      </div>
      {/* : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )} */}
    </React.Fragment>
  );
};

export default VictimRankTop;
