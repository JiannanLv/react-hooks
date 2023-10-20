const project = require("./project.config");

const __DEV__ = project.globals.__DEV__;

const webpackConfig = __DEV__
  ? require("./webpack.config.dev")
  : require("./webpack.config.pro");

module.exports = webpackConfig;
