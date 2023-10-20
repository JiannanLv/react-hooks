// api请求地址
// const base = "192.168.1.207";
const base = "localhost";
const version = "v1";
const port = "3012";
// const port = "8089";

export const host =
  process.env.NODE_ENV === "development"
    ? `http://${base}:${port}/api/${version}`
    : `/api/${version}`;

export const hostSimple =
  process.env.NODE_ENV === "development" ? `http://${base}:${port}` : ``;

export const hostServer =
  process.env.NODE_ENV === "development"
    ? `http://${base}:${port}`
    : window.location.origin;
// 接口列表：

// 图片列表获取
// 图片删除
// 图片获取
// 图片上传

// 控件模板列表获取
// 控件模板获取
// 上传控件为模板
// 控件模板获取

// 获取dbd所有信息
// 修改dbd信息
// 保存dbd页面信息
// 保存页面截图

// 数据集树获取
// 数据字段获取
// 数据绑定筛选
