const webpack = require("webpack");
const path = require("path");
const project = require("./project.config");
const __PROD__ = project.globals.__PROD__;

const dllConfig = {
  mode: project.env,
  entry: {
    vendors: Object.keys(project.compiler_vendors),
    // vendors,
  },
  resolve: {
    alias: Object.assign(project.compiler_vendors, {}),
  },
  output: {
    // 打包产出后文件存放位置
    path: project.paths.dist(),
    // entry chunk产出时的文件名称
    filename: `scripts/[name].lib.js`,
    // async chunk产出时的文件名称
    chunkFilename: `scripts/[name].lib.js`,
    library: "WEBPACKDLLPLUGIN",
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, "./[name]-manifest.json"),
      name: "WEBPACKDLLPLUGIN",
      context: __dirname,
    }),
  ],
};

// 生产模式下压缩vendors.dll.js文件
if (__PROD__) {
  dllConfig.plugins.push(
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
      },
    })
  );
}

module.exports = dllConfig;
