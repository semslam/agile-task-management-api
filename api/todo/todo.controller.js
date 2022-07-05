const todoService = require("../../services/todoServices");
const createTodo = async (req, res)=>{
    //TODO
    console.log(req.body);
    let todo = req.body;
    todo.userId = "wehi2728773862376826";
    todoService.insert(todo);
    res.status(201).send(todo);
}

const updateTodo = async (req,res)=>{
    res.status(200).send({message:"List out TODO"})
}

const getTodo = async (req,res)=>{
    res.status(200).send({message:"List out TODO"})
}

const deleteTodo = async (req,res)=>{
    res.status(200).send({message:"List out TODO"})
}


module.exports = {
    createTodo,
    updateTodo,
    getTodo,
    deleteTodo
}