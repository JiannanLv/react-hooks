import React, { useEffect, useState } from "react";
import moment from "moment";
// api
import { getFocusAssetScreenApi } from "@/api";
// config
import { config } from "@/util/config";
// css
import "./style.scss";

const FocusAssetsWarn = (props) => {
  const [warnData, updateWarnData] = useState([
    {
      name: "资产名称",
      type: "192.168.12.12",
      domain: "安全域名称",
      num: "9527",
      phone: "13988887963",
      person: "张三",
    },
    {
      name: "资产名称",
      type: "192.168.12.12",
      domain: "安全域名称",
      num: "9527",
      phone: "13988887963",
      person: "张三",
    },
    {
      name: "资产名称",
      type: "192.168.12.12",
      domain: "安全域名称",
      num: "9527",
      phone: "13988887963",
      person: "张三",
    },
    {
      name: "资产名称",
      type: "192.168.12.12",
      domain: "安全域名称",
      num: "9527",
      phone: "13988887963",
      person: "张三",
    },
    {
      name: "资产名称",
      type: "192.168.12.12",
      domain: "安全域名称",
      num: "9527",
      phone: "13988887963",
      person: "张三",
    },
  ]);
  const FocusAssetScreenData = () => {
    const endTime = moment().format("YYYY-MM-DD HH:mm:ss");
    const startTime = moment()
      .subtract(24, "hours")
      .format("YYYY-MM-DD HH:mm:ss");
    const rangeTime = [startTime, endTime];
    getFocusAssetScreenApi({ rangeTime }).then((res) => {
      if (res.httpStatus === config.API_SUCCESS_CODE) {
        updateWarnData(res.entity);
      }
    });
  };
  const handleJump = () => {
    const jumpUrl = "/assetmanagement/AManagement/assetlist";
    const paramsStr = `?rangeTime=${rangeTime}`;
    window.open(`${window.top.location.origin}/#${jumpUrl}${paramsStr}`);
  };
  useEffect(() => {
    FocusAssetScreenData();
  }, []);
  return (
    <div className="focus-assets-warn">
      <ul className="focus-assets-warn-list">
        {warnData.slice(0, 5).map((x, index) => {
          return (
            <li key={index}>
              {/* <img src={require("./images/file.png")} /> */}
              <div className="focus-assets-warn-info">
                <p className="assets-name">
                  {index + 1}.{x.name}
                </p>
                <p className="assets-ip">{x.type}</p>
                <p className="area-name">{x.domain}</p>
              </div>
              <div className="focus-assets-warn-num">
                <span className="num-span">{x.num}</span>
                <span>次</span>
              </div>
              <div className="focus-assets-warn-user">
                <p>
                  <img src={require("./images/user.png")} />
                  <span>{x.person || "--"}</span>
                </p>
                <p>{x.phone || "--"}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FocusAssetsWarn;
