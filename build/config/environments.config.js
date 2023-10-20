module.exports = {
  // ======================================================
  // Overrides when NODE_ENV === 'development'
  // ======================================================
  development: config => ({
    project_name: config.client_name,
    compiler_public_path: `http://${config.client_host}:${config.client_port}${
      config.client_name
    }/`
  }),

  // ======================================================
  // Overrides when NODE_ENV === 'production'
  // ======================================================
  production: config => ({
    project_name: config.server_name,
    compiler_public_path: `/`,
    compiler_fail_on_warning: false,
    compiler_hash_type: "chunkhash",
    compiler_devtool: null,
    compiler_stats: {
      chunks: true,
      chunkModules: true,
      colors: true
    }
  })
};
