const chatController = require("./chat.controller")
const {createGroupChatValidateReq,createOneOnOneChatValidateReq,removeAndUserFromGroupChatValidateReq,renameGroupChatValidateReq} =  require("./chat.validate");
const {authenticateToken} = require("../../middleware/hederAuthorization");
const express = require("express");
module.exports = () => {
    const router = express.Router();
    router.post("/create-group-chat/",authenticateToken,createGroupChatValidateReq,chatController.createGroupChat);
    router.post("/create-and-fetch-single-chat/",authenticateToken,createOneOnOneChatValidateReq,chatController.createOneToOneChat);
    router.put("/rename-group-chat/",authenticateToken,renameGroupChatValidateReq,chatController.renameGroupChat);
    router.put("/add-user-to-group-chat/",authenticateToken,removeAndUserFromGroupChatValidateReq,chatController.addToGroupChat);
    router.put("/remove-user-from-group-chat/",authenticateToken,removeAndUserFromGroupChatValidateReq,chatController.removeFromGroupChat);
    router.get("/fetch-user-chats/",authenticateToken,chatController.fetchUserChats);
    return router;
  };