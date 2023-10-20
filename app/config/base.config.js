const search = global.location.search;

export default {
  // 是否使用mock模式，在mock模式下向服务器的请求被mockjs拦截
  mock: false,
  // 是否使用proxy模式，在proxy模式下会使用proxy的url来替换原来的url
  proxy: false,
  // 模拟websocket时，消息的推送间隔(毫秒)
  mockInterval: 3500,
  // 轮询请求时的时间间隔(毫秒)
  fetchInterval: 3000,
  // 主要用于前后台联调，代理服务器域名，当proxy为true时，所有ajax请求都会发送到这个域名
  // proxyHost: "192.168.1.207:6001",
  // proxyImgHost: "http://192.168.1.207:6001",
  // 主要用于前后台联调，websocket代理服务器域名，当proxy为true时，所有websocket都会连接到这个域名
  websocketProxyHost: "",
  // 线上服务器域名，当访问URL时不加mock或proxy时，所有ajax请求都会发送到这个域名
  host: "",
  // websocket线上服务器域名，当访问URL时不加mock或proxy时，所有websocket都会连接到这个域名
  websocketHost: "",
  // 地图路径
  mapHost: "",
  // 是否使用zoom模式，在zoom模式下页面会根据窗口的宽高使用transform调整
  zoom: false,
  // 固定的页面宽
  pageWidth: 1920,
  // 固定的页面高
  pageHeight: 1080,
  // 数字滚动时间
  aniTime: 5000,
  // 系统管理侧边栏相关配置
  sidebar: {
    collapsible: true, // 是否显示折叠侧边栏的按钮
    autoMenuSwitch: true, // 只展开一个顶级菜单, 其他顶级菜单自动折叠
  },
};
