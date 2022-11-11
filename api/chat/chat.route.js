const chatController = require("./chat.controller")
const {addTodoValidateReq,updateTodoValidateReq} =  require("./chat.validate");
const {authenticateToken} = require("../../middleware/hederAuthorization");
const express = require("express");
module.exports = () => {
    const router = express.Router();
    router.post("/create/",authenticateToken,addTodoValidateReq,chatController.createChat);
    router.put("/update/:id",authenticateToken,updateTodoValidateReq,chatController.updateChat);
    router.get("/get/:id",authenticateToken,chatController.getChat);
    router.get("/get-all/",authenticateToken,chatController.getAllChat);
    router.delete("/delete/:id",authenticateToken,chatController.deleteChat);
    return router;
  };