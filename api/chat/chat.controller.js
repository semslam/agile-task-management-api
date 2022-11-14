const chatServices = require("../../services/chatServices");
const {successResponse,errorResponse} = require("../../response/responseHandler");
const {HttpCodes,ErrorCodes} = require("../../libraries/enums")
const {isEmpty, isNumeric} = require("../../libraries/utilities")

const createGroupChat = async (req, res)=>{
    try {
        
        let chat = req.body;
        chat.users = [req.user.id,...chat.users];
        chat.groupAdmin = req.user.id;
        const chatResult = await chatServices.insert(chat);
        successResponse(req,res,HttpCodes.CREATED,"Group chat was successful created!!",chatResult);
    } catch (err) {
        errorResponse(req,res,err.httpCode || ErrorCodes.FORBIDDEN,err.message);
    }
}

const createOneToOneChat = async (req, res)=>{
    try {
        
        let chat = req.body;
        chat.users =  [req.user.id,chat.userId];
        chat.groupAdmin = req.user.id
        delete chat.userId
        const chatResult = await chatServices.insert(chat);
        successResponse(req,res,HttpCodes.CREATED,"One to one chat was successful created!!",chatResult);
    } catch (err) {
        errorResponse(req,res,err.httpCode || ErrorCodes.FORBIDDEN,err.message);
    }
}


const updateChat = async (req,res)=>{
    try {

        if(isEmpty(req.params.id) || isNumeric(req.params.id)) errorResponse(req,res,ErrorCodes.MISSING_PARAMETER,"The group id must not be empty or a number!");
        const filter ={
            userId:req.user.id, // get user id from user token
            _id:req.params.id
        }
        const chatResult = await chatServices.updateOne(filter,req.body);
        successResponse(req,res,HttpCodes.OK,"Chat was successful updated!!",chatResult);
    } catch (err) {
        errorResponse(req,res,err.httpCode|| ErrorCodes.FORBIDDEN,err.message);
    }
}

const getChat = async (req,res)=>{
    
    try {

        if(isEmpty(req.params.id) || isNumeric(req.params.id)) errorResponse(req,res,ErrorCodes.MISSING_PARAMETER,"The group id must not be empty or a number!");
        const filter ={
            userId:req.user.id,
            _id:req.params.id
        }
        const chatResult = await chatServices.findOneByParams(filter);
        successResponse(req,res,HttpCodes.OK,"Chat was fetched successfully!!",chatResult);
    } catch (err) {
        errorResponse(req,res,err.httpCode|| ErrorCodes.FORBIDDEN,err.message);
    }
}
const getAllChats = async (req,res)=>{
    try {
        const filter ={
            userId:req.user.id,
        }
        const chatResult = await chatServices.findAll(filter);
        console.log(chatResult);
        successResponse(req,res,HttpCodes.OK,"Chat was fetched successfully!!",chatResult);
    } catch (err) {
        errorResponse(req,res,err.httpCode|| ErrorCodes.FORBIDDEN,err.message);
    }
}

const removeChat = async (req,res)=>{
    try {
        if(isEmpty(req.params.id) || isNumeric(req.params.id)) errorResponse(req,res,ErrorCodes.MISSING_PARAMETER,"The group id must not be empty or a number!");
        const filter ={
            userId:req.user.id,// get user id from user token
            _id:req.params.id
        }
        await chatServices.deleteOne(filter);
        successResponse(req,res,HttpCodes.OK,"Chat was deleted successfully!!");
    } catch (err) {
        errorResponse(req,res,err.httpCode|| ErrorCodes.FORBIDDEN,err.message);
    }
}



module.exports = {
    createGroupChat,
    createOneToOneChat,
    updateChat,
    getChat,
    getAllChats,
    removeChat

}