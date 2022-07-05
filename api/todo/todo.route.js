const todoController = require("./todo.controller")
module.exports = (router) => {
    console.log("TODO Route=====>")
    // router.post('/api/todo/create', todoController.createTodo);
    router.post('/create/',todoController.createTodo);
    router.put('/update/',todoController.updateTodo);
    router.get('/get/',todoController.getTodo);
    router.delete('/delete/',todoController.deleteTodo);
    
    return router;
  };