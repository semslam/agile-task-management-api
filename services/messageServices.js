const messageRepo = require("../repositories/messageRepository");
const userRepo = require("../repositories/userRepository");
const chatRepo = require("../repositories/chatRepository");
const {isObjEmpty, isEmpty} = require("../libraries/utilities");
const ErrorHandler = require("../libraries/errorHandler")
const {ErrorCodes,Stages} = require("../libraries/enums");
const Message = require("../models/entities/messages");

const User = userRepo.userSchema;
const Chat = chatRepo.chatSchema;

const insert = async (message)=>{
    if(isObjEmpty(message))
        throw new ErrorHandler("Message object is empty!!",ErrorCodes.MISSING_PARAMETER)

    return new Message(await messageRepo.create(message));
}
//update process
const sendNewMessage = async (newMessage, sender)=>{
    if(isObjEmpty(newMessage) || isEmpty(sender)) throw new ErrorHandler("Message object is empty!!",ErrorCodes.MISSING_PARAMETER)
    
    
    let message = new Message(await messageRepo.create(newMessage));

    message = await message.populate("sender", "name").execPopulate();
    message = await message.populate("chat").execPopulate();
    message = await User.populate(message, {
      path: "chat.users",
      select: "name username",
    });

    await Chat.findByIdAndUpdate(newMessage.chat, { latestMessage: message });
    return message;
}

const findOneByParams = async (query)=>{
    if(isObjEmpty(query))
        throw new ErrorHandler("Message query parameter is messing!!",ErrorCodes.MISSING_PARAMETER)
    
    return new Message(await findOne(query));
}

const findAll = async (query)=>{
    if(isObjEmpty(query))
        throw new ErrorHandler("Message query parameter is messing!!",ErrorCodes.MISSING_PARAMETER)
    
    const allMessage = await find(query);
   return allMessage.map(todo => {
      return new Message(todo);
    })
}

const deleteOne = async (query)=>{
    if(isObjEmpty(query)) 
    throw new ErrorHandler("Message query parameter is messing!!",ErrorCodes.MISSING_PARAMETER)
    const isDelete =  await del(query);

    if(!isDelete.deletedCount) throw new ErrorHandler("Message does not delete!",ErrorCodes.MISSING_PARAMETER);
    return isDelete;
}

module.exports = {insert,sendNewMessage,findOneByParams,findAll,deleteOne}