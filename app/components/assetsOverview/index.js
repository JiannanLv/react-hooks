import React, { useEffect, useState } from "react";
import { Carousel } from "antd";
// api
import { getAssetsDataApi } from "@/api";
// config
import { config } from "@/util/config";
// css
import "./style.scss";

const AssetsOverview = (props) => {
  const [assetsInfo, updateAssetsInfo] = useState([]);
  const [rangeTime, updateRangeTime] = useState([]);
  const getAssetsData = (rangeTime) => {
    getAssetsDataApi({ rangeTime }).then((res) => {
      if (res.httpStatus === config.API_SUCCESS_CODE) {
        const { assetsGeneral = [] } = res.entity;
        let assetsGroup = [];
        const allAssets = [];
        assetsGeneral.forEach((ele, index) => {
          if (index % 6 === 0 && index !== 0) {
            allAssets.push(assetsGroup);
            assetsGroup = [];
            assetsGroup.push(ele);
            console.log(assetsGroup, "assetsGroup");
          } else {
            assetsGroup.push(ele);
          }
          if (index === assetsGeneral.length - 1) {
            allAssets.push(assetsGroup);
          }
        });
        console.log(res.entity, "res", allAssets);
        updateAssetsInfo(allAssets);
      }
    });
  };
  const handleJump = (value) => {
    const jumpUrl = "/assetmanagement/AManagement/sstAssetManage";
    const paramsStr = `?assetType=${value}`;
    window.open(`${window.top.location.origin}/#${jumpUrl}${paramsStr}`);
  };
  useEffect(() => {
    console.log(props, "props");
    const { rangeTime = [] } = props.globalFilter;
    // const rangeTime = ["2023-06-14 17:59:18", "2023-06-21 17:59:18"];
    getAssetsData(rangeTime);
    updateRangeTime(rangeTime);
  }, [props.globalFilter]);
  return (
    <div className="assets-overview">
      <Carousel autoplay dots={false}>
        {assetsInfo.map((group) => {
          return (
            <div className="assets-overview-module">
              {group.map((assets) => {
                return (
                  <div onClick={() => handleJump(assets.value)}>
                    <p className="assets-overview-desc">
                      <span className="assets-overview-arrow" />
                      {assets.label}
                    </p>
                    <p className="assets-overview-num">{assets.total}</p>
                  </div>
                );
              })}
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default AssetsOverview;
