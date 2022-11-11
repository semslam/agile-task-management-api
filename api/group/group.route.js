const groupController = require("./group.controller")
const {addTodoValidateReq,updateTodoValidateReq} =  require("./group.validate");
const {authenticateToken} = require("../../middleware/hederAuthorization");
const express = require("express");
module.exports = () => {
    const router = express.Router();
    router.post("/create/",authenticateToken,addTodoValidateReq,groupController.createGroup);
    router.put("/update/:id",authenticateToken,updateTodoValidateReq,groupController.updateGroup);
    router.get("/get/:id",authenticateToken,groupController.getGroup);
    router.get("/get-all/",authenticateToken,groupController.getAllGroup);
    router.delete("/delete/:id",authenticateToken,groupController.deleteGroup);
    return router;
  };