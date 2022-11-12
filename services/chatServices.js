const chatRepo = require("../repositories/chatRepository");
const {isObjEmpty} = require("../libraries/utilities");
const ErrorHandler = require("../libraries/errorHandler")
const {ErrorCodes,Stages} = require("../libraries/enums");
const Chat = require("../models/entities/chat")

const insert = async (chat)=>{
    if(isObjEmpty(chat))
        throw new ErrorHandler("Chat object is empty!!",ErrorCodes.MISSING_PARAMETER)

    return new Chat(await chatRepo.create(chat));
}


//update process
const updateOne = async (filter,chat)=>{
    if(isObjEmpty(filter) || isObjEmpty(chat)) throw new ErrorHandler("Chat object is empty!!",ErrorCodes.MISSING_PARAMETER)
    
    chat.modifiedAt = new Date();
    return new Chat(await chatRepo.update(filter,chat));
}

const findOneByParams = async (query)=>{
    if(isObjEmpty(query))
        throw new ErrorHandler("Chat query parameter is messing!!",ErrorCodes.MISSING_PARAMETER)
    
    return new Chat(await chatRepo.findOne(query));
}


const findAll = async (query)=>{
    if(isObjEmpty(query))
        throw new ErrorHandler("Chat query parameter is messing!!",ErrorCodes.MISSING_PARAMETER)
    
    const allchats = await chatRepo.find(query);
   return allchats.map(chats => {
      return new Chat(chats);
    })
}

const deleteOne = async (query)=>{
    if(isObjEmpty(query)) 
    throw new ErrorHandler("Chat query parameter is messing!!",ErrorCodes.MISSING_PARAMETER)
    const isDelete =  await chatRepo.del(query);

    if(!isDelete.deletedCount) throw new ErrorHandler("Chat does not delete!",ErrorCodes.MISSING_PARAMETER);
    return isDelete;
}

module.exports = {insert,updateOne,findOneByParams,findAll,deleteOne}