const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");

const project = require("./project.config");

const APP_ENTRY = project.paths.client("app.js");

const webpackConfig = {
  mode: project.env,
  name: "client",
  target: "web",
  devtool: project.compiler_devtool,
  resolve: {
    extensions: [".js", ".jsx", ".json"],
    alias: Object.assign(project.compiler_vendors, {
      "@": project.paths.client(),
    }),
  },
  entry: {
    app: [APP_ENTRY].concat(
      `webpack-hot-middleware/client?path=${project.compiler_public_path}__webpack_hmr`
    ),
  },
  output: {
    // 打包产出后文件存放位置
    path: project.paths.dist(),
    // entry chunk产出时的文件名称
    filename: `${project.project_name}scripts/[name].[${project.compiler_hash_type}].js`,
    // async chunk产出时的文件名称
    chunkFilename: `${project.project_name}scripts/[id].[${project.compiler_hash_type}].js`,
    publicPath: project.compiler_public_path,
  },
  externals: {
    "react/lib/ExecutionEnvironment": true,
    "react/lib/ReactContext": true,
    "react/addons": true,
  },
  module: {
    noParse: [/hymapgl-test/],
    rules: [
      {
        test: /\.woff(\?.*)?$/,
        loader:
          "url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff",
      },
      {
        test: /\.woff2(\?.*)?$/,
        loader:
          "url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2",
      },
      {
        test: /\.otf(\?.*)?$/,
        loader:
          "file-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=font/opentype",
      },
      {
        test: /\.ttf(\?.*)?$/,
        loader:
          "url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream",
      },
      {
        test: /\.eot(\?.*)?$/,
        loader: "file-loader?prefix=fonts/&name=[path][name].[ext]",
      },
      {
        test: /\.svg(\?.*)?$/,
        loader:
          "url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml",
      },
      {
        test: /\.(png|jpg)$/,
        loader: "url-loader?limit=8192",
        options: {
          // 不超过3000字节的资源直接用base64
          limit: 3000,
          name: "images/[name].[hash:7].[ext]",
          esModule: false,
        },
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader?cacheDirectory",
      },
      {
        test: /\.json$/,
        use: [
          {
            loader: "json-loader",
          },
        ],
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          "style-loader",
          "css-loader?sourceMap&-minimize",
          "sass-loader?sourceMap",
        ],
      },
      {
        test: /\.css$/,
        // exclude: /node_modules/,
        use: ["style-loader", "css-loader?sourceMap&-minimize"],
      },
      {
        test: /\.less$/,
        // exclude: /node_modules/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "less-loader",
            options: {
              javascriptEnabled: true,
              modifyVars: {
                "@icon-url": JSON.stringify(`/dashboard/fonts/antd/iconfont`),
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin(project.globals),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require("./vendors-manifest.json"),
    }),
    new HtmlWebpackPlugin({
      template: project.paths.client("index.html"),
      hash: false,
      filename: "index.html",
      inject: "body",
      minify: {
        collapseWhitespace: true,
      },
    }),
    new AddAssetHtmlPlugin({
      includeSourcemap: false,
      filepath: require.resolve("../../dist/scripts/vendors.lib.js"),
      outputPath: "scripts",
      publicPath: `http://${project.client_host}:${project.client_port}${project.client_name}/scripts`,
    }),
  ],
};

// url-loader中使用option时候避免警告信息
process.traceDeprecation = true;

module.exports = webpackConfig;
