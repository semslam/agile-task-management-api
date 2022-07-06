const todoService = require("../../services/todoServices");
const {successResponse,errorResponse} = require("../../response/responseHandler");
const {HttpCodes} = require("../../libraries/enums")
const createTodo = async (req, res)=>{
    try {
        console.log(req.body);
        let todo = req.body;
        todo.userId = "wehi2728773862376826";
        await todoService.insert({});
        successResponse(res,HttpCodes.CREATED,"Todo was successful created!!") 
    } catch (err) {
        errorResponse(res,err.httpCode,err.message);
    }
}

const updateTodo = async (req,res)=>{
   const filter ={
        userId:"wehi2728773862376826",
        _id:"987247478648746478"
    }
    let todo = req.body; 
    todoService.updateOne(filter,todo);
    res.status(200).send({message:"List out TODO"})
}

const getTodo = async (req,res)=>{
    const filter ={
        userId:"wehi2728773862376826",
        _id:"987247478648746478"
    }
    todoService.findOneByParams(filter);
    res.status(200).send({message:"List out TODO"})
}
const getAllTodo = async (req,res)=>{
    const filter ={
        userId:"wehi2728773862376826",
    }
    todoService.findAll(filter);
    res.status(200).send({message:"List out TODO"})
}

const deleteTodo = async (req,res)=>{
    todoService.findAll("todoId");
    res.status(200).send({message:"List out TODO"})
}


module.exports = {
    createTodo,
    updateTodo,
    getTodo,
    getAllTodo,
    deleteTodo
}