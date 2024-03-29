const express = require("express");
const userRoute = require("./users/user.route");
const todoRoute = require("./todo/todo.route");
const groupRoute = require("./group/group.route");
const chatRoute = require("./chat/chat.route");
const messageRoute = require("./message/message.route");

module.exports = () => {
  const router = express.Router();
  router.use("/users",userRoute())
  router.use("/group",groupRoute())
  router.use("/todo",todoRoute())
  router.use("/chat",chatRoute())
  router.use("/message",messageRoute())
  return router
  };