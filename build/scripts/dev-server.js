const path = require("path");
const express = require("express");
const webpack = require("webpack");
const compress = require("compression");
const proxy = require("http-proxy-middleware");

const webpackConfig = require("../config/webpack.config");
const project = require("../config/project.config");

const app = express();

// Apply gzip compression
app.use(compress());
// ------------------------------------
// Apply Webpack HMR Middleware
// ------------------------------------
const compiler = webpack(webpackConfig);
// ======================================================
// proxy server
// ======================================================
app.use(
  ["^/sst-canvas*", "^/sst-services*", "^/chart*", "^/dataset*", "^/pic*"],
  proxy({
    target: "https://192.168.120.203",
    secure: false,
    changeOrigin: true,
    // ws: true
    // pathRewrite: {
    //   '^/prod-api': ''
    // }
  })
);
app.use(
  require("webpack-dev-middleware")(compiler, {
    publicPath: webpackConfig.output.publicPath,
    contentBase: project.paths.client(),
    hot: true,
    quiet: true,
    noInfo: false,
    lazy: false,
    historyApiFallback: true,
    stats: project.compiler_stats,
  })
);
app.use(
  require("webpack-hot-middleware")(compiler, {
    path: "/__webpack_hmr",
  })
);

app.use("/dashboard", express.static(project.paths.public()));

app.use("*", (req, res, next) => {
  const filename = path.join(compiler.outputPath, "index.html");
  compiler.outputFileSystem.readFile(filename, (err, result) => {
    if (err) {
      return next(err);
    }
    res.set("content-type", "text/html");
    res.send(result);
    res.end();
  });
});

app.listen(project.server_port);
console.log(
  `Server is now running at http://localhost:${project.server_port}.`
);
