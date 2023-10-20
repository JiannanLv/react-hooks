import DomUtils from "./domUtils";
import RouterUtils from "./RouterUtils";

export function checkHttpStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else if (response.status == 401) {
    // 没有权限删除
    localStorage.removeItem("token");
    RouterUtils.toLogin();
    throw new Error("没有权限");
  } else if (response.status == 412) {
    response.json().then((json) => {
      DomUtils.showMessage(json.message);
      throw new Error(json.message);
    });
  } else if (response.status == 403) {
    // alert('你没有权限进行此操作')
    DomUtils.showMessage("你没有权限进行此操作");
    throw new Error("没有权限");
  } else {
    const error = new Error(response.statusText);
    error.response = response;
    DomUtils.removeLoading();
    throw error;
  }
}

export function parseJSON(response) {
  DomUtils.removeLoading();
  return response.json();
}
export function authorization(response) {
  // if(response.status == 403) {
  //     RouterUtils.toLogin()
  // }
  return response;
}

export function fetchProtect(url, param) {
  const token = localStorage.getItem("token");
  !param && (param = {});
  !param.headers && (param.headers = {});

  let Authorization = `Bearer ${token}`;

  if (token && token.indexOf("Share") !== -1) {
    Authorization = token;
  }
  param.headers = Object.assign(param.headers, {
    Authorization,
    Accept: "application/json",
    "Content-Type": "application/json",
  });

  return fetch(url, param)
    .then(checkHttpStatus, () => {
      console.log("验证出现问题");
    })
    .then(parseJSON)
    .then(authorization)
    .catch((error) => {
      // DomUtils.removeLoading();
      console.info(
        `%c后台数据返回失败: ${error}`,
        "background-color: #000; color: red; padding: 5px;"
      );
    });
}
