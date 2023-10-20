// 判断2个对象内容是否相等
export function equalObj(x, y) {
  if (x === y) {
    return true;
  }
  // 如果x，y 有一个不是对象的就返回false
  if (!(x instanceof Object) || !(y instanceof Object)) {
    return false;
  }

  for (var p in x) {
    if (x.hasOwnProperty(p)) {
      if (!y.hasOwnProperty(p)) {
        return false;
      }
      if (typeof x[p] === "object" && typeof y[p] === "object") {
        equalObj(x[p], y[p]);
      }
      if (x[p] === y[p]) {
        continue;
      } else {
        return false;
      }
    }
  }

  for (var p in y) {
    if (y.hasOwnProperty(p)) {
      if (!x.hasOwnProperty(p)) {
        return false;
      }
      if (typeof x[p] === "object" && typeof y[p] === "object") {
        equalObj(x[p], y[p]);
      }
      if (x[p] === y[p]) {
        continue;
      } else {
        return false;
      }
    }
  }

  return true;
}
