const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const debug = require("debug")("app:config:webpack");

const project = require("./project.config");

const APP_ENTRY = project.paths.client("app.js");

debug("Creating configuration.");

const webpackConfig = {
  mode: project.env,
  devtool: false,
  resolve: {
    extensions: [".js", ".jsx", ".json"],
    alias: Object.assign(project.compiler_vendors, {
      "@": project.paths.client(),
    }),
  },
  entry: {
    app: [APP_ENTRY],
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
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },

      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              minimize: true, // css压缩
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
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
  optimization: {
    // minimize: true,
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true, // set to true if you want JS source maps
        uglifyOptions: {
          output: {
            comments: false,
          },
          compress: {
            // 删除所有的 `console` 语句
            drop_console: true,
          },
        },
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessor: require("cssnano"),
        cssProcessorOptions: {
          discardComments: { removeAll: true },
          // 避免 cssnano 重新计算 z-index
          safe: true,
        },
        canPrint: false,
      }),
    ],
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: __dirname,
      // context: project.path_base,
      manifest: require("./vendors-manifest.json"),
    }),
    new webpack.DefinePlugin(project.globals),
    new HtmlWebpackPlugin({
      template: project.paths.client("index.html"),
      hash: false,
      filename: "index.html",
      inject: "body",
      minify: {
        collapseWhitespace: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: `${project.server_name}styles/[name].min.[chunkhash:5].css`,
      chunkFilename: `${project.server_name}styles/[id].min.[chunkhash:5].css`,
    }),
    new AddAssetHtmlPlugin({
      includeSourcemap: false,
      filepath: require.resolve("../../dist/scripts/vendors.lib.js"),
      outputPath: `${project.server_name}/scripts`,
      publicPath: `/${project.server_name}/scripts`,
    }),
  ],
};

// url-loader中使用option时候避免警告信息
process.traceDeprecation = true;

module.exports = webpackConfig;
