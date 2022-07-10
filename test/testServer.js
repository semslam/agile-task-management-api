const express = require("express");
const routes = require("../api/routes");
const {Config} = require("../configs/bootstrap");

function testServer() {
  const app = express();
  app.use(express.json());
  const PATH = Config.API_BASE;
 
  app.use(routes())
  return app;
}

module.exports = testServer;