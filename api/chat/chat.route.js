const chatController = require("./chat.controller")
const {createGroupChatValidateReq,createOneOnOneChatValidateReq,updateChatValidateReq} =  require("./chat.validate");
const {authenticateToken} = require("../../middleware/hederAuthorization");
const express = require("express");
module.exports = () => {
    const router = express.Router();
    router.post("/create-group-chat/",authenticateToken,createGroupChatValidateReq,chatController.createGroupChat);
    router.post("/create-one-on-one-chat/",authenticateToken,createOneOnOneChatValidateReq,chatController.createOneToOneChat);
    router.put("/update/",authenticateToken,updateChatValidateReq,chatController.updateChat);
    router.get("/fetch/:id",authenticateToken,chatController.getChat);
    router.get("/fetches/",authenticateToken,chatController.getAllChats);
    router.delete("/remove/:id",authenticateToken,chatController.removeChat);
    return router;
  };