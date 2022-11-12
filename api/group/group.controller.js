const groupServices = require("../../services/groupServices");
const {successResponse,errorResponse} = require("../../response/responseHandler");
const {HttpCodes,ErrorCodes} = require("../../libraries/enums")
const {isEmpty, isNumeric} = require("../../libraries/utilities")

const createGroup = async (req, res)=>{
    try {
        
        let group = req.body;
        group.adminId = req.user.id;
        
        const groupResult = await groupServices.insert(group);
        successResponse(req,res,HttpCodes.CREATED,"Group was successful created!",groupResult);
    } catch (err) {
        errorResponse(req,res,err.httpCode || ErrorCodes.FORBIDDEN,err.message);
    }
}


const updateGroup = async (req,res)=>{
    try {

        const filter ={
            adminId:req.user.id,
            _id:req.body.id
        }
        const group = req.body;
        delete group._id;
         console.log(req.body)
        const groupResult = await groupServices.updateOne(filter,req.body);
        successResponse(req,res,HttpCodes.OK,"Group was successful updated!!",groupResult);
    } catch (err) {
        errorResponse(req,res,err.httpCode|| ErrorCodes.FORBIDDEN,err.message);
    }
}

const getGroup = async (req,res)=>{
    
    try {

        if(isEmpty(req.params.id) || isNumeric(req.params.id)) 
             errorResponse(req,res,ErrorCodes.MISSING_PARAMETER,"The group id must not be empty or a number!");
    
        const filter ={
            adminId:req.user.id,
            _id:req.params.id
        }
        console.log(filter)
        const groupResult = await groupServices.findOneByParams(filter);
        successResponse(req,res,HttpCodes.OK,"Group was fetched successfully!!",groupResult);
    } catch (err) {
        errorResponse(req,res,err.httpCode|| ErrorCodes.FORBIDDEN,err.message);
    }
}
const getAllGroup = async (req,res)=>{
    try {
        const filter ={
            adminId:req.user.id,
        }
        const groupResult = await groupServices.findAll(filter);
        console.log(groupResult);
        successResponse(req,res,HttpCodes.OK,"Group was fetched successfully!!",groupResult);
    } catch (err) {
        errorResponse(req,res,err.httpCode|| ErrorCodes.FORBIDDEN,err.message);
    }
}

const deleteGroup = async (req,res)=>{
    try {
        if(isEmpty(req.params.id) || isNumeric(req.params.id)) 
            errorResponse(req,res,ErrorCodes.MISSING_PARAMETER,"The group id must not be empty or a number!");
        const filter ={
            adminId:req.user.id,
            _id:req.params.id
        }
        await groupServices.deleteOne(filter);
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