import Cookies from "js-cookie";
import { JSEncrypt } from "jsencrypt";
export const _UUID = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    let r, v;
    r = (Math.random() * 16) | 0;
    v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const flatten = (arr) =>
  arr.reduce(
    (acc, val) => acc.concat(Array.isArray(val) ? flatten(val) : val),
    []
  );
/**
 * @param obj
 * @description 去除对象值为空的字段
 */
export const rmObjEmptyFields = (obj) => {
  if (!obj || typeOf(obj) !== "object") return obj;

  return Object.keys(obj)
    .filter((key) => isNotEmpty(obj[key]))
    .reduce((_obj, key2) => {
      _obj[key2] = obj[key2];

      return _obj;
    }, {});
};

/**
 * @param obj
 * @description trim对象中的字符字段
 */
export const trimObjFields = (obj) => {
  if (!obj || typeOf(obj) !== "object") return;

  Object.keys(obj).forEach((key) => {
    if (typeOf(obj[key]) === "string") {
      obj[key] = obj[key].trim();
    }
  });

  return obj;
};

/**
 * 获取cookie值
 * @param {*} key
 */
export const getCookie = (key) => {
  const val = Cookies.get(key);
  if (val) {
    return val;
  }
  return undefined;
};

/** RSA加密 */
export const rsaEncrypt = (value) => {
  let encrypt = new JSEncrypt();
  encrypt.setPublicKey(
    "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCJPx7jpf8856l1avam57sHIjhOkH6ewdUbx/buGI6Rt6u0wAsaa9Ns9xpM1Vl9PIGds3VqOyeMoTuQW43mzYxHoWjcBU01hKQdjx/iOs8gJlZ8Ai9/5/Of7fIC+J2RyuAh04PXgzUM82EGdhJsrpeU3XeYQLQasgVb+abpXIAfgQIDAQAB"
  );
  return encrypt.encrypt(value);
};
export const getUserAccount = () => {
  return sessionStorage.getItem("account");
};
/**
 * 使用随机串+用户账号+请求时间戳构成的校验串，其中随机串+请求时间戳用于检测重放攻击，用户账号用于补充token冒用检测需要的信息
 * 随机数长度可以适当加长
 * 2022-08-26 xip 修改原因 原先使用_是用户名中允许使用的字符，导致带_的用户登录登录不上
 */
export const signature = () => {
  return rsaEncrypt(
    `${Math.random().toFixed(10)}-${getUserAccount()}-${new Date().getTime()}`
  );
};
