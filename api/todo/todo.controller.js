const todoService = require("../../services/todoServices");
const {successResponse,errorResponse} = require("../../response/responseHandler");
const {HttpCodes,ErrorCodes} = require("../../libraries/enums")
const {isString} = require("../../libraries/utilities")
const createTodo = async (req, res)=>{
    try {
        console.log(req.body);
        console.log("This todo controller");
        console.log(req.user);
        let todo = req.body;
        todo.userId = req.user._id;
        const todoResult = await todoService.insert(todo);
        successResponse(res,HttpCodes.CREATED,"Todo was successful created!!",todoResult);
    } catch (err) {
        errorResponse(res,err.httpCode || ErrorCodes.FORBIDDEN,err.message);
    }
}

const updateTodo = async (req,res)=>{
    try {

        // req.params.id
        console.log(req.body)
        console.log(req.params.id)
        if(!isString(req.params.id)) errorResponse(res,ErrorCodes.MISSING_PARAMETER,"Todo id can't be empty!");
        const filter ={
            userId:req.user._id,
            _id:req.params.id
        }
        let todo = req.body;
        const todoResult = await todoService.updateOne(filter,req.body);
        successResponse(res,HttpCodes.OK,"Todo was successful updated!!",todoResult);
    } catch (err) {
        errorResponse(res,err.httpCode|| ErrorCodes.FORBIDDEN,err.message);
    }
}

const getTodo = async (req,res)=>{
    
    try {

        if(!isString(req.params.id)) errorResponse(res,ErrorCodes.MISSING_PARAMETER,"Todo id can't be empty!");
        const filter ={
            userId:req.user._id,
            _id:req.params.id
        }
        const todoResult = await todoService.findOneByParams(filter);
        successResponse(res,HttpCodes.OK,"Todo was fetched successfully!!",todoResult);
    } catch (err) {
        errorResponse(res,err.httpCode|| ErrorCodes.FORBIDDEN,err.message);
    }
}
const getAllTodo = async (req,res)=>{
    try {
        const filter ={
            userId:req.user._id,
        }
        const todoResult = await todoService.findAll(filter);
        successResponse(res,HttpCodes.OK,"Todo was fetched successfully!!",todoResult);
    } catch (err) {
        errorResponse(res,err.httpCode|| ErrorCodes.FORBIDDEN,err.message);
    }
}

const deleteTodo = async (req,res)=>{
    try {
        const filter ={
            userId:req.user._id,
            _id:req.params.id
        }
        await todoService.deleteOne(filter);
        successResponse(res,HttpCodes.OK,"Todo was deleted successfully!!");
    } catch (err) {
        errorResponse(res,err.httpCode|| ErrorCodes.FORBIDDEN,err.message);
    }
}


module.exports = {
    createTodo,
    updateTodo,
    getTodo,
    getAllTodo,
    deleteTodo
}