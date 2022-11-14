const {create,MessageModel} = require("../repositories/messageRepository");
const {UserModel} = require("../repositories/userRepository");
const {ChatModel} = require("../repositories/chatRepository");
const {isObjEmpty} = require("../libraries/utilities");
const ErrorHandler = require("../libraries/errorHandler")
const {ErrorCodes} = require("../libraries/enums");
const Message = require("../models/entities/messages");



//update process
const sendNewMessage = async (newMessage)=>{
    if(isObjEmpty(newMessage)) 
        throw new ErrorHandler("Message object is empty!!",ErrorCodes.MISSING_PARAMETER)
    
    
    let message = await create(newMessage);

    message = await message.populate("sender", "name username");
    message = await message.populate("chat");
    message = await UserModel.populate(message, {
      path: "chat.users",
      select: "name username",
    });

    await ChatModel.findByIdAndUpdate(newMessage.chat, {latestMessage: message});
    return message;
}


const findAll = async (query)=>{
    if(isObjEmpty(query))
        throw new ErrorHandler("Message query parameter is messing!!",ErrorCodes.MISSING_PARAMETER)
        
    const allMessage = await MessageModel.find(query)
    .populate("sender", "name username")
    .populate("chat");
   return allMessage.map(message => {
      return new Message(message);
    })
}


module.exports = {sendNewMessage,findAll}