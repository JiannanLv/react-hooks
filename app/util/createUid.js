import MD5 from "./md5";

export function getWidgetUid() {
  return `${MD5(`${new Date().getTime()}${Math.random() * 10000}`)}`;
}

export function getPageUid() {
  return `${MD5(`${new Date().getTime()}${Math.random() * 10000}`)}`;
}
