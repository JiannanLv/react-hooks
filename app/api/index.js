import request from "@/util/request";

export const getSrcIntelligenceDataApi = (data) => {
  return request({
    url: "/threatScreen/getSrcIntelligenceData",
    method: "post",
    data,
  });
};
