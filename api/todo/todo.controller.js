const todoService = require("../../services/todoServices");
const {successResponse,errorResponse} = require("../../response/responseHandler");
const {HttpCodes,ErrorCodes} = require("../../libraries/enums")
const {isEmpty, isNumeric} = require("../../libraries/utilities")
const createTodo = async (req, res)=>{
    try {
        
        let todo = req.body;
        todo.userId = req.user.id;
        const todoResult = await todoService.insert(todo);
        successResponse(req,res,HttpCodes.CREATED,"Todo was successful created!!",todoResult);
    } catch (err) {
        errorResponse(req,res,err.httpCode || ErrorCodes.FORBIDDEN,err.message);
    }
}


const updateTodo = async (req,res)=>{
    try {

        if(isEmpty(req.params.id) || isNumeric(req.params.id)) errorResponse(req,res,ErrorCodes.MISSING_PARAMETER,"The todo id must not be empty or a number!");
        const filter ={
            userId:req.user.id,
            _id:req.params.id
        }
        const todoResult = await todoService.updateOne(filter,req.body);
        successResponse(req,res,HttpCodes.OK,"Todo was successful updated!!",todoResult);
    } catch (err) {
        errorResponse(req,res,err.httpCode|| ErrorCodes.FORBIDDEN,err.message);
    }
}

const getTodo = async (req,res)=>{
    
    try {

        if(isEmpty(req.params.id) || isNumeric(req.params.id)) errorResponse(req,res,ErrorCodes.MISSING_PARAMETER,"The todo id must not be empty or a number!");
        const filter ={
            userId:req.user.id,
            _id:req.params.id
        }
        const todoResult = await todoService.findOneByParams(filter);
        successResponse(req,res,HttpCodes.OK,"Todo was fetched successfully!!",todoResult);
    } catch (err) {
        errorResponse(req,res,err.httpCode|| ErrorCodes.FORBIDDEN,err.message);
    }
}
const getAllTodo = async (req,res)=>{
    try {
        const filter ={
            userId:req.user.id,
        }
        const todoResult = await todoService.findAll(filter);
        console.log(todoResult);
        successResponse(req,res,HttpCodes.OK,"Todo was fetched successfully!!",todoResult);
    } catch (err) {
        errorResponse(req,res,err.httpCode|| ErrorCodes.FORBIDDEN,err.message);
    }
}

const deleteTodo = async (req,res)=>{
    try {
        if(isEmpty(req.params.id) || isNumeric(req.params.id)) errorResponse(req,res,ErrorCodes.MISSING_PARAMETER,"The todo id must not be empty or a number!");
        const filter ={
            userId:req.user.id,
            _id:req.params.id
        }
        await todoService.deleteOne(filter);
        successResponse(req,res,HttpCodes.OK,"Todo was deleted successfully!!");
    } catch (err) {
        errorResponse(req,res,err.httpCode|| ErrorCodes.FORBIDDEN,err.message);
    }
}

module.exports = {
    createTodo,
    updateTodo,
    getTodo,
    getAllTodo,
    deleteTodo,
}