const todoService = require("../../services/todoServices");
const {successResponse,errorResponse} = require("../../response/responseHandler");
const {HttpCodes,ErrorCodes} = require("../../libraries/enums")
const {isEmpty, isNumeric} = require("../../libraries/utilities")
const createGroup = async (req, res)=>{
    try {
        
        let group = req.body;
        group.userId = req.user.id;
        const groupResult = await todoService.insert(group);
        successResponse(req,res,HttpCodes.CREATED,"Group was successful created!!",groupResult);
    } catch (err) {
        errorResponse(req,res,err.httpCode || ErrorCodes.FORBIDDEN,err.message);
    }
}


const updateGroup = async (req,res)=>{
    try {

        if(isEmpty(req.params.id) || isNumeric(req.params.id)) errorResponse(req,res,ErrorCodes.MISSING_PARAMETER,"The group id must not be empty or a number!");
        const filter ={
            userId:req.user.id,
            _id:req.params.id
        }
        const groupResult = await todoService.updateOne(filter,req.body);
        successResponse(req,res,HttpCodes.OK,"Group was successful updated!!",groupResult);
    } catch (err) {
        errorResponse(req,res,err.httpCode|| ErrorCodes.FORBIDDEN,err.message);
    }
}

const getGroup = async (req,res)=>{
    
    try {

        if(isEmpty(req.params.id) || isNumeric(req.params.id)) errorResponse(req,res,ErrorCodes.MISSING_PARAMETER,"The group id must not be empty or a number!");
        const filter ={
            userId:req.user.id,
            _id:req.params.id
        }
        const groupResult = await todoService.findOneByParams(filter);
        successResponse(req,res,HttpCodes.OK,"Group was fetched successfully!!",todoResult);
    } catch (err) {
        errorResponse(req,res,err.httpCode|| ErrorCodes.FORBIDDEN,err.message);
    }
}
const getAllGroup = async (req,res)=>{
    try {
        const filter ={
            userId:req.user.id,
        }
        const groupResult = await todoService.findAll(filter);
        console.log(todoResult);
        successResponse(req,res,HttpCodes.OK,"Group was fetched successfully!!",groupResult);
    } catch (err) {
        errorResponse(req,res,err.httpCode|| ErrorCodes.FORBIDDEN,err.message);
    }
}

const deleteGroup = async (req,res)=>{
    try {
        if(isEmpty(req.params.id) || isNumeric(req.params.id)) errorResponse(req,res,ErrorCodes.MISSING_PARAMETER,"The group id must not be empty or a number!");
        const filter ={
            userId:req.user.id,
            _id:req.params.id
        }
        await todoService.deleteOne(filter);
        successResponse(req,res,HttpCodes.OK,"Group was deleted successfully!!");
    } catch (err) {
        errorResponse(req,res,err.httpCode|| ErrorCodes.FORBIDDEN,err.message);
    }
}



module.exports = {
    createGroup,
    updateGroup,
    getGroup,
    getAllGroup,
    deleteGroup,
}