const messageService = require("../../services/messageServices");
const {successResponse,errorResponse} = require("../../response/responseHandler");
const {HttpCodes,ErrorCodes} = require("../../libraries/enums")
const {isEmpty, isNumeric} = require("../../libraries/utilities")

const allMessages = async (req, res)=>{
    try {
        const chatId = req.params.chatId
        if(isEmpty(chatId) || isNumeric(chatId)) 
        errorResponse(req,res,ErrorCodes.MISSING_PARAMETER,"Invalid chatId request");
      
        const messageResult = await messageService.findAll({chat:chatId});
        successResponse(req,res,HttpCodes.CREATED,"Message was fetched successfully!!",messageResult);
    } catch (err) {
        errorResponse(req,res,err.httpCode || ErrorCodes.FORBIDDEN,err.message);
    }
}


const sendMessage = async (req,res)=>{
    try {
        const { content, chatId } = req.body;

        const newMessage = {
            sender: req.user.id,
            content: content,
            chat: chatId,
          };

        const message = await messageService.sendNewMessage(newMessage);
        successResponse(req,res,HttpCodes.CREATED,"Message was successful updated!!",message);
    } catch (err) {
        errorResponse(req,res,err.httpCode|| ErrorCodes.FORBIDDEN,err.message);
    }
}




module.exports = {
    allMessages,
    sendMessage,
}