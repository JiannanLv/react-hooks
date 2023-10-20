const webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const project = require("./project.config");

const dllConfig = {
  mode: project.env,
  entry: {
    app: "./app/components/onDutyInfo/init.js",
  },
  output: {
    path: project.paths.amd(),
    filename: `init.js`,
    libraryTarget: "amd",
  },
  resolve: {
    alias: Object.assign(project.compiler_vendors, {
      "@": project.paths.client(),
    }),
  },
  // externals: {
  //   echarts: "echarts",
  // },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
      },
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require("./vendors-manifest.json"),
    }),
  ],
  module: {
    rules: [
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
          {
            loader: "css-loader",
            options: {
              minimize: true,
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              minimize: true,
            },
          },
        ],
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
      {
        test: /\.(png|jpg)$/,
        loader: "url-loader?limit=80000",
        options: {
          // 不超过3000字节的资源直接用base64
          limit: 80000,
          name: "images/[name].[hash:7].[ext]",
          esModule: false,
        },
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        uglifyOptions: {
          output: {
            comments: false,
          },
          compress: {
            drop_console: true,
          },
        },
      }),
    ],
  },
};

module.exports = dllConfig;
