const messageService = require("../../services/messageServices");
const {successResponse,errorResponse} = require("../../response/responseHandler");
const {HttpCodes,ErrorCodes} = require("../../libraries/enums")
const {isEmpty, isNumeric} = require("../../libraries/utilities")

const allMessages = async (req, res)=>{
    try {
        
        let message = req.body;
        message.userId = req.user.id; // from user token
        const messageResult = await todoService.insert(message);
        successResponse(req,res,HttpCodes.CREATED,"Message was successful created!!",messageResult);
    } catch (err) {
        errorResponse(req,res,err.httpCode || ErrorCodes.FORBIDDEN,err.message);
    }
}


const sendMessage = async (req,res)=>{
    try {
        const { content, chatId } = req.body;
        if(isEmpty(chatId) || isEmpty(content)) 
            errorResponse(req,res,ErrorCodes.MISSING_PARAMETER,"Invalid data passed into request");
        

        const newMessage = {
            sender: req.user._id,
            content: content,
            chat: chatId,
          };

        const sender = req.user.name;
        const message = await messageService.sendNewMessage(newMessage,sender);
        successResponse(req,res,HttpCodes.OK,"Message was successful updated!!",message);
    } catch (err) {
        errorResponse(req,res,err.httpCode|| ErrorCodes.FORBIDDEN,err.message);
    }
}




module.exports = {
    allMessages,
    sendMessage,
}