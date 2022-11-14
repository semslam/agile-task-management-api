const messageController = require("./message.controller")
const {addNewMessageValidateReq} =  require("./message.validate");
const {authenticateToken} = require("../../middleware/hederAuthorization");
const express = require("express");
module.exports = () => {
    const router = express.Router();
    router.post("/",authenticateToken,addNewMessageValidateReq,messageController.sendMessage);
    router.get("/:chatId",authenticateToken,messageController.allMessages);
    return router;
  };