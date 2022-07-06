const userController = require("./user.controller");
const validator = require("./users.validator");
module.exports = (router) => {
  
    router.post('/create/',validator.onBoardValidateReq,userController.createUser);
    router.get('/update/',validator.loginValidateReq,userController.updateUser);
    router.post('/login/',userController.loginUser);
    router.get('/logout/',userController.logoutUser);  
    return router;
  };