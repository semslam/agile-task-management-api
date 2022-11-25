const userController = require("./user.controller");
const validator = require("./users.validator");
const {authenticateToken} = require("../../middleware/hederAuthorization")
const {Config} = require("../../configs/bootstrap");
const express = require("express");
module.exports = () => {
  const router = express.Router();
    router.post("/create/",validator.onBoardValidateReq,userController.createUser);
    router.put("/update/",authenticateToken,validator.updateValidateReq,userController.updateUser);
    router.post("/login/",validator.loginValidateReq,userController.loginUser);
    router.get("/logout/",authenticateToken,userController.logoutUser);
    router.get("/",authenticateToken,userController.searchUsers);
    router.get("/image/",authenticateToken,userController.uploadImage);

    return router;
  };