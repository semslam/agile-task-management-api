const messageController = require("./message.controller")
const {addTodoValidateReq,updateTodoValidateReq} =  require("./group.validate");
const {authenticateToken} = require("../../middleware/hederAuthorization");
const express = require("express");
module.exports = () => {
    const router = express.Router();
    router.get("/:chatId",messageController.allMessages);
    router.post("/",messageController.sendMessage);
    return router;
  };