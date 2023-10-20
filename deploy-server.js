// const configs = require("./build/config/project.config");
const path = require("path");
const express = require("express");
// const proxy = require('http-proxy-middleware');
const compression = require("compression");

const app = express();

// gzip
app.use(compression());

// server static resource
app.use(
  express.static(path.join(__dirname, "server/dashboard"), {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    setHeaders: (res, path, stat) => {
      res.set("Access-Control-Allow-Origin", "*");
    },
  })
);

// Unmatched static resource, redirect to index.html ->  router
app.use("*", (req, res) =>
  res.sendFile(path.join(__dirname, "server/dashboard", "index.html"))
);

// compiler
app.listen(3032, function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(
    `--====> 💻 start Listening at Open http://localhost:3012<====----`
  );
});
