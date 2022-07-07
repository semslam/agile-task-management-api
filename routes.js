const express = require("express");
const baseRoute = require("./api/routes")

module.exports = (app) => {
  let router = express.Router();
    app.use('/api',baseRoute(router));
   
  };