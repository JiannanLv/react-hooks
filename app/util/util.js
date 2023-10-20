const urlToJSON = () => {
  const str = window.location.href;
  const reg = /([^?=&]+)=([^=?&]+)/g;
  let str1 = "{";
  let result = null;
  while ((result = reg.exec(str))) {
    str1 += `"${result[1]}":"${result[2]}"` + `,`;
  }
  str1 = str1.slice(0, -1);
  if (!str1) {
    return {};
  }
  str1 += "}";
  return JSON.parse(str1);
};
// 匹配{year}{month}  中的year 和 month
const matchQuery = (str) => {
  const reg = /({.*})/g;
  const result = reg.exec(str);
  return result;
};
// 克隆
const clone = (obj) => {
  let o;
  if (typeof obj !== "object" || obj === null) return obj;
  if (obj instanceof Array) {
    o = [];
    for (let i = 0, j = obj.length; i < j; i++) {
      if (typeof obj[i] === "object" && obj[i] != null) {
        o[i] = this.clone(obj[i]);
      } else {
        o[i] = obj[i];
      }
    }
  } else {
    o = {};
    for (const i in obj) {
      if (typeof obj[i] === "object" && obj[i] != null) {
        o[i] = this.clone(obj[i]);
      } else {
        o[i] = obj[i];
      }
    }
  }
  return o;
};
// 合并
const merge = (des, src) => {
  let isEmpty = true;
  for (const i in des) {
    isEmpty = false;
    break;
  }
  if (isEmpty) {
    return src;
  }
  if (src instanceof Array) {
    for (var i = 0, len = src.length; i < len; i++) {
      this.merge(des, src[i]);
    }
  }
  for (var i in src) {
    isEmpty = false;
    // if ((i in des)) {//原有字段
    if (typeof src[i] === "object" && src[i] != null) {
      des[i] = this.merge(des[i], src[i]);
    } else {
      des[i] = src[i];
    }
    // }
  }

  return des;
};

const isEmptyObject = (obj) => {
  if (typeof obj !== "object") {
    return !obj;
  }

  return JSON.stringify(obj) == "{}";
};
const getJsonSzie = (json) => {
  let size = 0;
  for (const k in json) {
    size++;
  }
  return size;
};
// 判断当前是否处在layout 路径
const inLayout = () => {
  const pathname = window.location.href;

  if (pathname.indexOf("layout") != -1) {
    return true;
  }
  return false;
};
const getTextSize = (text, style) => {
  let span, position, width, height;
  span = document.createElement("span");
  span.innerText = text;
  for (const key in style) {
    if (!isNaN(style[key])) {
      span.style[key] = `${style[key]}px`;
    } else {
      span.style[key] = style[key];
    }
  }
  document.body.appendChild(span);
  position = span.getBoundingClientRect();
  width = position.width;
  height = position.height;
  document.body.removeChild(span);
  return {
    width,
    height,
  };
};
// 是否整数
const isInteger = (obj) => {
  const i = obj * 1;
  return typeof i === "number" && i % 1 === 0;
};
const createJS = (src) => {
  const script = document.createElement("script");
  script.src = src;
  script.type = "text/javascript";
  document.body.appendChild(script);

  return new Promise((resolve, reject) => {
    script.onload = function () {
      resolve(true);
    };

    script.onerror = () => {
      reject(false, `找不到${src}`);
    };
  });
};
const _loadJS = async (src) => {
  const script = document.querySelector(`script[src="${src}"]`);

  if (!script) {
    return await this.createJS(src);
  }

  return true;
};
const loadJS = (src) => {
  if (src instanceof Array) {
    const promises = src.map((s) => _loadJS(s));

    return Promise.all(promises);
  }

  return _loadJS(src);
};
const createCss = (href) => {
  const link = document.createElement("link");
  link.href = href;
  link.type = "text/css";
  link.rel = "stylesheet";
  document.body.appendChild(link);
  return new Promise((resolve, reject) => {
    link.onload = function () {
      resolve(true);
    };

    link.onerror = () => {
      reject(false, `找不到${href}`);
    };
  });
};
const _loadCss = async (href) => {
  const link = document.querySelector(`link[href="${href}"]`);

  if (!link) {
    return await this.createCss(href);
  }

  return await true;
};
const loadCss = (href) => {
  if (href instanceof Array) {
    const promises = href.map((s) => this._loadCss(s));

    return Promise.all(promises);
  }

  return this._loadCss(href);
};
// 这个方法用来转换数据 例如 {A:[a,b,v],num:[1,2,3]} 转为 [{A:a,num:1},{...}]
// 传入需要转换的对象  返回一个数组
const converter = (obj) => {
  const ret = [];
  const keys = Object.keys(obj);
  // 返回所有最大的长度
  const max = keys.reduce((max, key) => Math.max(max, obj[key].length), 0);
  for (let i = 0; i < max; i++) {
    const item = {};
    keys.forEach((value, index) => {
      let valueItem = obj[keys[index]][i];
      if (valueItem == null) valueItem = null;
      item[keys[index]] = valueItem;
    });
    ret.push(item);
  }
  return ret;
};
// 进入全屏
const requestFullScreen = (element) => {
  const requestMethod =
    element.requestFullscreen ||
    element.webkitRequestFullscreen ||
    element.mozRequestFullScreen ||
    element.webkitRequestFullscreen;

  if (requestMethod) {
    requestMethod.call(element);
  } else if (typeof window.ActiveXObject !== "undefined") {
    const wscript = new ActiveXObject("WScript.Shell");

    if (wscript != null) {
      wscript.SendKeys("{F11}");
    }
  }
};
// 退出全屏
const exitFullScreen = () => {
  const exitMethod =
    document.exitFullscreen ||
    document.msExitFullscreen ||
    document.mozCancelFullScreen ||
    document.webkitExitFullscreen;

  exitMethod.call(document);
};
/**
 * @description 转64位编码
 * @param {any} files
 * @param {any} callback
 */
const toBase64 = (files, callback) => {
  let result = [],
    i,
    reader,
    index,
    fileMap = [];

  if (files) {
    for (i = 0; i < files.length; i++) {
      (function (j) {
        const file = files[j];
        reader = new FileReader();
        reader.onload = function (e) {
          index = e.target.result.lastIndexOf(",");
          fileMap.push({
            fileName: file.name,
            fileData: e.target.result.slice(index + 1),
          });

          if (j == files.length - 1) {
            callback && callback(fileMap);
          }
        };

        reader.readAsDataURL(file);
      })(i);
    }
  }
};
/**
 *  生成一个延迟函数
 *  @param    {Function}  func        需要延迟执行的函数
 *  @param    {number}  delayMillis 延迟执行的毫秒数
 *  @return   {Function}  延迟函数
 */
const delay = (func, delayMillis) =>
  function delayFunc(immediate) {
    if (immediate === true) {
      func();
    } else {
      setTimeout(func, delayMillis);
    }
  };
/**
 * @description 浅比较对象
 * @param {any} obj
 * @param {any} newObj
 */
const objectCompare = (obj, newObj) => {
  if (obj === newObj) {
    return true;
  }
  if (obj instanceof Array && newObj instanceof Array) {
    if (obj.length != newObj.length) {
      return false;
    }

    return obj.every((item, index) => item === newObj[index]);
  }
  const objKeys = Object.keys(obj);
  const newObjKeys = Object.keys(newObj);

  if (objKeys.length !== newObjKeys.length) {
    return false;
  }
  return objKeys.every(
    (key) => newObj.hasOwnProperty(key) && newObj[key] === obj[key]
  );
};
/**
 * @description 节流函数（只运行最后一次修改）
 * @param {any} function
 * @param {any} number
 */
const lastThrottle = (func, time) => {
  let timer = null;
  return (...rest) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...rest);
    }, time || 300);
  };
};
/**
 * @description 节流函数（间隔运行）
 * @param {any} function
 * @param {any} number
 */
const evenThrottle = (func, time) => {
  let timer = null;
  let previous = null;
  return (...rest) => {
    const nowTime = +new Date();
    if (!previous) previous = nowTime;
    if (nowTime - previous >= time) {
      previous = nowTime;
      func(...rest);
      return;
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      previous = null;
      func(...rest);
    }, time || 300);
  };
};
const changeSize = (beforeW, beforeH, DOM) => {
  const newWidth = Number(window.innerWidth);
  const newHeight = Number(window.innerHeight);
  const appBox = document.querySelector(DOM);
  const Y = !(newWidth > beforeW);
  appBox.style.transformOrigin = "0 0";
  appBox.style.transform = Y
    ? "scale(1, 1)"
    : `scale(${newWidth / beforeW},${newWidth / beforeW})`;
  appBox.style.width = Y ? "100%" : `${(beforeW / newWidth) * 100}%`;
  appBox.style.height = Y ? "100%" : `${(beforeH / newHeight) * 100}%`;
};

const pictureDownload = (url, name) => {
  var a = document.createElement("a");
  var event = new MouseEvent("click");
  a.download = name + ".png";
  a.href = url;
  a.dispatchEvent(event);
};

const getLocationHash = () => {
  let hash = window.location.hash;
  return (
    hash.includes("#") &&
    hash
      .slice(1)
      .split("&")
      .reduce((all, item) => {
        let data = item.split("=");
        all[data[0]] = data[1];
        return all;
      }, {})
  );
};
const transformUrl = (url) => {
  const requestParams = {};
  let originUrl = null;
  if (url.indexOf("?") !== -1) {
    let str = url.substr(url.indexOf("?") + 1);
    let strs = str.split("&");
    originUrl = url.substr(0, url.indexOf("?"));
    for (let i = 0; i < strs.length; i++) {
      requestParams[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
    }
  } else {
    originUrl = url;
  }
  return { params: requestParams, origin: originUrl };
};

export {
  urlToJSON,
  matchQuery,
  clone,
  merge,
  isEmptyObject,
  getJsonSzie,
  inLayout,
  getTextSize,
  isInteger,
  createJS,
  _loadJS,
  loadJS,
  createCss,
  _loadCss,
  loadCss,
  converter,
  requestFullScreen,
  exitFullScreen,
  toBase64,
  delay,
  objectCompare,
  lastThrottle,
  evenThrottle,
  changeSize,
  pictureDownload,
  getLocationHash,
  transformUrl,
};
