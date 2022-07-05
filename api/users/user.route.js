const userController = require("./user.controller");
module.exports = (router) => {
  
    router.post('/create/');
    router.post('/login/');
    router.get('/logout/');
    
    return router;
  };