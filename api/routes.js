const express = require("express");
const userRoute = require("./users/user.route");
const todoRoute = require("./todo/todo.route");

module.exports = () => {
  const router = express.Router();
  router.use("/users",userRoute())
  router.use("/todo",todoRoute())
  return router
  };