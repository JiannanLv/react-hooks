import request from "@/util/request";

// 最新命中情报查询
export const getSrcIntelligenceDataApi = (data) => {
  return request({
    url: "/threatScreen/getSrcIntelligenceData",
    method: "post",
    data,
  });
};
// 资产概况接口获取
export const getAssetsDataApi = (data) => {
  return request({
    url: "/synthesisSec/getAssetsData",
    method: "post",
    data,
  });
};
//重保大屏-重点关注资产威胁监测
export const getFocusAssetScreenApi = (data) => {
  return request({
    url: "/major/majorTaskAttack/focusAssetScreen",
    method: "post",
    data,
  });
};
// 重保大屏-监测报告
export const getTaskReportListApi = (data) => {
  return request({
    url: "/major/majorTaskReport/listScreen",
    method: "post",
    data,
  });
};
// 重保大屏-监测报告
export const getDeadlineApi = () => {
  return request({
    url: "/major/majorTask/deadline",
    method: "get",
  });
};
// 重保大屏-值班信息
export const getDutyInfoApi = (data) => {
  return request({
    url: "/major/majorTaskAttack/getDutyInfo",
    method: "post",
    data,
  });
};
