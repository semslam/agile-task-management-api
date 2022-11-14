const chatServices = require("../../services/chatServices");
const {successResponse,errorResponse} = require("../../response/responseHandler");
const {HttpCodes,ErrorCodes} = require("../../libraries/enums")

const createGroupChat = async (req, res)=>{
    try {
        
        let chat = req.body;
        chat.users = [req.user.id,...chat.users];
        chat.groupAdmin = req.user.id;
        const chatResult = await chatServices.insertGroupChat(chat);
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
       
        const chatResult = await chatServices.insertAndFetchOneToOne(chat);
        successResponse(req,res,HttpCodes.CREATED,"One to one chat was successful created!!",chatResult);
    } catch (err) {
        errorResponse(req,res,err.httpCode || ErrorCodes.FORBIDDEN,err.message);
    }
}


const renameGroupChat = async (req,res)=>{
    try {

        const {chatId, chatName} = req.body;
        const chatResult = await chatServices.updateOne(chatId,chatName);
        successResponse(req,res,HttpCodes.OK,"Chat was successful updated!!",chatResult);
    } catch (err) {
        errorResponse(req,res,err.httpCode|| ErrorCodes.FORBIDDEN,err.message);
    }
}

const addToGroupChat = async (req,res)=>{
    try {
        const {chatId, userId} = req.body;
        
        const chatResult = await chatServices.addToGroupChat(chatId,userId);
        successResponse(req,res,HttpCodes.OK,"User was added to the group chat successfully!!",chatResult);
    } catch (err) {
        errorResponse(req,res,err.httpCode|| ErrorCodes.FORBIDDEN,err.message);
    }
}

const removeFromGroupChat = async (req,res)=>{
    try {
        const {chatId, userId} = req.body;

        const chatResult = await chatServices.deleteFromGroupChat(chatId,userId);
        successResponse(req,res,HttpCodes.OK,"User was removed from the group chat successfully!!",chatResult);
    } catch (err) {
        errorResponse(req,res,err.httpCode|| ErrorCodes.FORBIDDEN,err.message);
    }
}

const fetchUserChats = async (req,res)=>{
    try {
        const filter ={
            userId:req.user.id,
        }
        const chatResult = await chatServices.findAllByUser(filter);
        console.log(chatResult);
        successResponse(req,res,HttpCodes.OK,"Chat was fetched successfully!!",chatResult);
    } catch (err) {
        errorResponse(req,res,err.httpCode|| ErrorCodes.FORBIDDEN,err.message);
    }
}




module.exports = {
    createGroupChat,
    createOneToOneChat,
    renameGroupChat,
    addToGroupChat,
    fetchUserChats,
    removeFromGroupChat

}