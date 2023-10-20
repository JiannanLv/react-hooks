const path = require("path");
const debug = require("debug")("app:config:project");
const environments = require("./environments.config");

debug("Creating default configuration.");
// ========================================================
// Default Configuration
// ========================================================
const config = {
  env: process.env.NODE_ENV || "development",

  // ----------------------------------
  // Project Structure
  // ----------------------------------
  path_base: path.resolve(__dirname, "../.."),
  dir_client: "app",
  dir_dist: "dist",
  dir_amd: "build/amd/script",
  dir_public: "dashboard",

  // ----------------------------------
  // Server Configuration
  // 部署服务器地址、端口和项目名称
  // ----------------------------------
  client_host: "localhost",
  client_port: process.env.PORT || 8090,
  client_name: "",

  server_host: "localhost",
  server_port: process.env.PORT || 8090,
  server_name: "dashboard/",
  server_dir: "server/dashboard",

  // ----------------------------------
  // Compiler Configuration
  // ----------------------------------
  compiler_devtool: "eval-source-map", //"source-map",
  compiler_hash_type: "hash",
  compiler_fail_on_warning: false,
  compiler_public_path: "/",
  compiler_stats: {
    chunks: false,
    chunkModules: false,
    colors: true,
  },
  compiler_vendors: {
    echarts: path.join(
      process.cwd(),
      "node_modules/echarts/dist/echarts.min.js"
    ),
    // d3: path.join(process.cwd(), "node_modules/d3/dist/d3.min.js"),
    react: path.join(
      process.cwd(),
      "node_modules/react/cjs/react.production.min.js"
    ),
    "react-dom": path.join(
      process.cwd(),
      "node_modules/react-dom/cjs/react-dom.production.min.js"
    ),
    "react-redux": path.join(
      process.cwd(),
      "node_modules/react-redux/dist/react-redux.min.js"
    ),
    "react-router-dom": path.join(
      process.cwd(),
      "node_modules/react-router-dom/umd/react-router-dom.min.js"
    ),
    redux: path.join(process.cwd(), "node_modules/redux/dist/redux.min.js"),
    "seamless-immutable": path.join(
      process.cwd(),
      "node_modules/seamless-immutable/seamless-immutable.production.min.js"
    ),
  },
};

// ------------------------------------
// Environment
// ------------------------------------
config.globals = {
  "process.env": {
    NODE_ENV: JSON.stringify(config.env),
  },
  NODE_ENV: JSON.stringify(config.env),
  __DEV__: config.env === "development",
  __PROD__: config.env === "production",
  __BASENAME__: JSON.stringify(process.env.BASENAME || ""),
};

// ------------------------------------
// Utilities
// ------------------------------------
function base() {
  const args = [config.path_base].concat([].slice.call(arguments));
  return path.resolve(...args);
}

config.paths = {
  base,
  client: base.bind(null, config.dir_client),
  // public: base.bind(null, config.dir_public),
  dist: base.bind(null, config.dir_dist),
  amd: base.bind(null, config.dir_amd),
};

// ========================================================
// Environment Configuration
// ========================================================
debug(`Looking for environment overrides for NODE_ENV "${config.env}".`);

const overrides = environments[config.env];
if (overrides) {
  debug("Found overrides, applying to default configuration.");
  Object.assign(config, overrides(config));
} else {
  debug("No environment overrides found, defaults will be used.");
}

module.exports = config;
