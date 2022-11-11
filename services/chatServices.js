const {create,update,findOne, del,find} = require("../repositories/groupRepository");
const {isObjEmpty} = require("../libraries/utilities");
const ErrorHandler = require("../libraries/errorHandler")
const {ErrorCodes,Stages} = require("../libraries/enums");
const Chat = require("../models/entities/chat")

const insert = async (chat)=>{
    if(isObjEmpty(chat))
        throw new ErrorHandler("Chat object is empty!!",ErrorCodes.MISSING_PARAMETER)

    return new Chat(await create(chat));
}


//update process
const updateOne = async (filter,chat)=>{
    if(isObjEmpty(filter) || isObjEmpty(chat)) throw new ErrorHandler("Chat object is empty!!",ErrorCodes.MISSING_PARAMETER)
    
    chat.modifiedAt = new Date();
    return new Chat(await update(filter,chat));
}

const findOneByParams = async (query)=>{
    if(isObjEmpty(query))
        throw new ErrorHandler("TODO query parameter is messing!!",ErrorCodes.MISSING_PARAMETER)
    
    return new Chat(await findOne(query));
}

this.id = chat._id
this.users = chat.users // array of users object
this.todoId = chat.todoId // reference to todo object
this.chatName = chat.chatName
this.isGroupChat = chat.isGroupChat
this.latestMessage = chat.latestMessage // reference to message object
this.groupAdmin = chat.groupAdmin // reference to user object
this.createdAt = chat.createdAt
this.modifiedAt = chat.modifiedAt

const findAll = async (query)=>{
    if(isObjEmpty(query))
        throw new ErrorHandler("Chat query parameter is messing!!",ErrorCodes.MISSING_PARAMETER)
    
    const allchats = await find(query);
   return allchats.map(chats => {
      return new Chat(chats);
    })
}

const deleteOne = async (query)=>{
    if(isObjEmpty(query)) 
    throw new ErrorHandler("Chat query parameter is messing!!",ErrorCodes.MISSING_PARAMETER)
    const isDelete =  await del(query);

    if(!isDelete.deletedCount) throw new ErrorHandler("Chat does not delete!",ErrorCodes.MISSING_PARAMETER);
    return isDelete;
}

module.exports = {insert,updateOne,findOneByParams,findAll,deleteOne}