const express = require("express");
const userRoute = require("./user/user.route");
const todoRoute = require("./todo/todo.route");

module.exports = (app) => {
    let router = express.Router();
    app.use("/users",userRoute(router));
    app.use("/todo",todoRoute(router));    
  };