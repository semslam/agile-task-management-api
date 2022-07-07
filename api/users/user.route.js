const userController = require("./user.controller");
const validator = require("./users.validator");
const {authenticateToken} = require("../../middleware/hederAuthorization")
module.exports = (router) => {
  console.log("USER route=========>")
    router.post('/create/',validator.onBoardValidateReq,userController.createUser);
    router.put('/update/',authenticateToken,validator.updateValidateReq,userController.updateUser);
    router.post('/login/',validator.loginValidateReq,userController.loginUser);
    router.get('/logout/',authenticateToken,userController.logoutUser);  
    return router;
  };