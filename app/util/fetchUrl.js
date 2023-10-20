// fetchUrl
const fetchUrl = (
  url,
  parameter = {
    params: null,
    method: "GET",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // 'WorkbenchContainer-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      // 'WorkbenchContainer-Type' = null
    },
  }
) => {
  // parameter
  const {
    params = null,
    method = "GET",
    mode = "cors",
    headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      // 'WorkbenchContainer-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      // 'WorkbenchContainer-Type' = null
    },
  } = parameter;

  // check is formData
  const isFormData = () => {
    return (
      !headers["Content-Type"] ||
      headers["Content-Type"].indexOf("multipart/form-data") != -1
    );
  };

  // single name || multi name file upload
  const createFormData = (pars) => {
    let formData = new FormData();
    Object.entries(pars).forEach(([key, val]) => {
      formData.append(key, val);
    });
    return formData;
  };

  // set Authorization
  const setHeaders = (headers) => {
    const Authorization = localStorage.getItem("token");

    return Object.assign(
      {},
      { ...headers },
      {
        "X-Token": Authorization,
      }
    );
  };

  // 对象转换url拼接参数
  const transformParsToUrl = (url, par) => {
    const parArr = Object.entries(par).map(([key, v]) => {
      return `${key}=${v}`;
    });
    return parArr.length ? `?${parArr.join("&")}` : "";
  };

  // 判断url是否传递过来参数
  // const checkUrlPars = url => {
  //   const reg = /\?/g;
  //   return reg.test(url);
  // };

  // 拦截get请求，后缀加上请求hash，避免get缓存机制导致数据异常
  // const setUrlHash = url => method => {
  //   return method === "GET"
  //     ? `${url + (checkUrlPars(url) ? "&" : "?")}version=${_UUID()}`
  //     : url;
  // };

  // 基础参数
  const basePars = Object.assign(
    {},
    { method, mode, headers: setHeaders(headers), credentials: "omit" }
  );

  // 如果是get就执行url携带参数，否则body传递参数
  const transformData = (method, basePars, params) => (url) => {
    return url
      ? method.toUpperCase() === "GET" && params
        ? url + transformParsToUrl(url, params)
        : url
      : method.toUpperCase() === "GET"
      ? Object.assign({}, { ...basePars })
      : Object.assign(
          {},
          { ...basePars },
          {
            body: isFormData()
              ? createFormData(params)
              : JSON.stringify(params),
          }
        );
  };

  // 柯里化
  const baseFn = transformData(method, basePars, params);
  // const baseFnUrl = setUrlHash(baseFn(url))(method);

  return fetch(baseFn(url), baseFn())
    .then((res) => {
      if (res.status >= 200 && res.status < 300) {
        return res.json();
      }
      // 401 token无效
      if (res.status === 401) {
        window.location.href = "/login";
      }
      throw new Error(url, res.statusText);
    })
    .then((data, status, xhr) => {
      // 2 token无效/查询失败
      // if (data.code === 2) {
      //   return Promise.reject("接口失败！");
      // }
      return data;
    })
    .catch((err) => {
      console.error(`${url}请求失败----->${err}`);
    });
};
export default fetchUrl;
