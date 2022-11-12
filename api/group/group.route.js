const groupController = require("./group.controller")
const {addGroupValidateReq,updateGroupValidateReq} = require("./group.validate");
const {authenticateToken} = require("../../middleware/hederAuthorization");
const express = require("express");
module.exports = () => {
    const router = express.Router();
    router.post("/create/",authenticateToken,addGroupValidateReq,groupController.createGroup);
    router.put("/update/",authenticateToken,updateGroupValidateReq,groupController.updateGroup);
    router.get("/get/:id",authenticateToken,groupController.getGroup);
    router.get("/get-all/",authenticateToken,groupController.getAllGroup);
    router.delete("/delete/:id",authenticateToken,groupController.deleteGroup);
    return router;
  };