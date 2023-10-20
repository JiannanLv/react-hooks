import axios from "axios";
import qs from "qs";
import { message } from "antd";
import { rmObjEmptyFields, trimObjFields, signature } from "./tools";
import { config as appConfig } from "./config";

// 创建axios实例
const service = axios.create({
  responseType: "json",
});

// request拦截器
service.interceptors.request.use(
  (config) => {
    config.timeout = config.timeout || appConfig.API_REQUEST_TIMEOUT;
    config.url = `${config.baseURL || appConfig.API_REQUEST_BASE_URL}${
      config.url
    }`;
    config.baseURL = "";
    config.headers = {
      "X-Signature": signature(),
      "Content-Type": appConfig.API_REQUEST_CONTENT_TYPE,
      ...appConfig.API_REQUEST_HEADERS,
      ...config.headers,
    };
    const store = appConfig.STORE;
    // Do something before request is sent
    // 手配sessionId权重高于默认获取
    if (!config.headers.Authorization && store && store.getters.token) {
      config.headers.Authorization = store.getters.token; // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
    } else {
      config.headers.Authorization = sessionStorage.getItem("access_token");
    }
    let { data } = config;
    let removeEmptyFields = true;
    if (config.removeEmptyFields !== "undefined") {
      removeEmptyFields = config.removeEmptyFields;
    }
    // 清除空的参数
    if (removeEmptyFields) {
      data = rmObjEmptyFields(config.data);
    }
    let trimFields = true;
    if (config.trimFields !== "undefined") {
      trimFields = config.trimFields;
    }
    // 清楚空格操作
    if (trimFields) {
      trimObjFields(data);
    }

    if (["post", "put", "patch"].includes(config.method.toLowerCase())) {
      if (
        config.headers["Content-Type"] === "application/x-www-form-urlencoded"
      ) {
        config.data = qs.stringify(data);
      } else {
        config.data = data;
      }
    } else if (["get", "delete"].includes(config.method.toLowerCase())) {
      const params = config.params || config.data;
      config.params = { ...params, t: Date.parse(new Date()) / 1000 };
    }
    return config;
  },
  (error) => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);

// respone拦截器
service.interceptors.response.use(
  (response) => {
    const store = appConfig.STORE;
    const { config } = response;
    const { data } = response;
    const errorCodes = config.errorCodes || [];
    // 用户没有配置catchAll,返回response
    if (config.catchAll) {
      return response;
    }
    // 配置了responeType 不是 JSON。返回response.data;
    if (config.responseType !== "json") {
      return data;
    }
    if (data.httpStatus === appConfig.API_SUCCESS_CODE) {
      // 返回code为成功，返回json中的data
      return data;
    }
    // 阻止超时忽略登出页登出动作
    if (data.httpStatus === appConfig.API_EXPIRED_CODE) {
      if (store && store._actions.logout && !config.ingoreExpired) {
        // 如果session过期，注销刷新。路由会自动跳入到登录
        store.dispatch("logout").then(() => {
          // window.location.reload();
          const url = appConfig.EXPIRED_TO_URL;
          window.location.href = appConfig.EXPIRED_TO_URL;
          if (url.indexOf("http") < 0) {
            window.location.reload();
          }
        });
      }
      if (appConfig.IS_ERROR_MESSAGE || config.isErrorMessage) {
        message.error(appConfig.EXPIRED_MESSAG);
      }
      return Promise.reject(appConfig.EXPIRED_MESSAGE);
      // return Promise.reject(data.code);
    }
    if (errorCodes.includes(data.code)) {
      // 可以再调用的config里设置errorCodes，表明哪些code码要求返回（用于特殊code码的业务处理）
      return Promise.reject(data.code);
    }
    if (appConfig.IS_ERROR_MESSAGE || config.isErrorMessage) {
      message.error(data.message);
    }

    // 否则，我们把message推到异常
    return Promise.reject(data);
  },
  (error) => {
    // 特殊response error code错误处理
    if (appConfig.API_RESPONSE_ERROR_CODE) {
      const {
        response: { status },
      } = error;
      if (appConfig.API_RESPONSE_ERROR_METHOD) {
        appConfig.API_RESPONSE_ERROR_METHOD(+status);
      }
    }
    let { message } = error;
    let tips = false;
    // 获取error message里的关键字，做出相应提示
    if (message.indexOf("timeout") >= 0) {
      message = "请求地址超时";
      tips = true;
    }
    if (message.indexOf("404") >= 0 || message === "Network Error") {
      message = "请求地址不存在，返回404";
      tips = true;
    }
    if (tips && appConfig.IS_ERROR_MESSAGE) {
      message.error(message);
    }
    return Promise.reject(message);
  }
);

export default service;
