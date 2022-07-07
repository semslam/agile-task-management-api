const todoController = require("./todo.controller")
const {addTodoValidateReq,updateTodoValidateReq} =  require("./todo.validate");
const {authenticateToken} = require("../../middleware/hederAuthorization")
module.exports = (router) => {

    router.post('/create/',authenticateToken,addTodoValidateReq,todoController.createTodo);
    router.put('/update/:id',authenticateToken,updateTodoValidateReq,todoController.updateTodo);
    router.get('/get/:id',authenticateToken,todoController.getTodo);
    router.get('/get-all/',authenticateToken,todoController.getAllTodo);
    router.delete('/delete/:id',authenticateToken,todoController.deleteTodo);
    
    return router;
  };