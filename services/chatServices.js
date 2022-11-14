const {UserModel} = require("../repositories/userRepository");
const {ChatModel,create} = require("../repositories/chatRepository");
const {isObjEmpty} = require("../libraries/utilities");
const ErrorHandler = require("../libraries/errorHandler")
const {ErrorCodes} = require("../libraries/enums");
const Chat = require("../models/entities/chat")

const insertAndFetchOneToOne = async (chat)=>{
    if(isObjEmpty(chat))
        throw new ErrorHandler("Chat object is empty!!",ErrorCodes.MISSING_PARAMETER)

        let isChat = await ChatModel.find({
            isGroupChat: false,
            $and: [
              { users: { $elemMatch: { $eq: chat.groupAdmin } } },
              { users: { $elemMatch: { $eq: chat.userId } } },
            ],
          })
            .populate("users", "-password")
            .populate("latestMessage");
        
          isChat = await UserModel.populate(isChat, {
            path: "latestMessage.sender",
            select: "name username",
          });
    if(isChat.length > 0){
        return isChat;
    }else{
        delete chat.userId

        const chatRecord = new Chat(await create(chat));
        const fullChat = await ChatModel.findOne({ _id: chatRecord.id}).populate(
            "users",
            "-password"
          );
        return fullChat;
    }        
}

const insertGroupChat = async (chat)=>{
    if(isObjEmpty(chat))
        throw new ErrorHandler("Chat object is empty!!",ErrorCodes.MISSING_PARAMETER)

        const groupChat = await create({
            groupId: chat.groupId,
            chatName: chat.chatName,
            users: chat.users,
            isGroupChat: true,
            groupAdmin: chat.groupAdmin,
          });
      
        const fullGroupChat = await ChatModel.findOne({ _id: groupChat._id })
            .populate("groupId", "-createdAt")
            .populate("users", "name username")
            .populate("groupAdmin", "name username");

    return new Chat(fullGroupChat);
}


//update process
const updateOne = async (chatId,chatName)=>{
    
    const chat = new Chat(await ChatModel.findByIdAndUpdate(chatId,{
        chatName: chatName,
        modifiedAt:new Date()
      },
      {
        new: true,
      })
      .populate("users", "-password")
      .populate("groupAdmin", "-password"));
  if(!chat)
    throw new ErrorHandler("Chat record doesn't exist!",ErrorCodes.MISSING_PARAMETER)
  
  return chat;  
}


const addToGroupChat = async (chatId,userId)=>{
    
    const addedChat = new Chat(await ChatModel.findByIdAndUpdate(chatId,
        {
          $push: { users: userId },
        },
        {
          new: true,
        })
      .populate("users", "-password")
      .populate("groupAdmin", "-password"));
  if(!addedChat)
    throw new ErrorHandler("Chat record doesn't exist!",ErrorCodes.MISSING_PARAMETER)
  
  return addedChat;  
}

const findAllByUser = async (query)=>{
    if(isObjEmpty(query))
        throw new ErrorHandler("Chat query parameter is messing!!",ErrorCodes.MISSING_PARAMETER)


    let chats =  await ChatModel.find({ users: { $elemMatch: { $eq: query.userId} } })
      .populate("groupId", "-createdAt")
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 });

      chats = await UserModel.populate(chats, {
        path: "latestMessage.sender",
        select: "name username",
      });
    
   return chats.map(chat => {
      return new Chat(chat);
    })
}

const deleteFromGroupChat = async (chatId,userId)=>{

    const deleteChat = new Chat(await ChatModel.findByIdAndUpdate(chatId,
        {
            $pull: { users: userId },
        },
        {
          new: true,
        })
      .populate("users", "-password")
      .populate("groupAdmin", "-password"));
  if(!deleteChat)
    throw new ErrorHandler("Chat record doesn't exist!",ErrorCodes.MISSING_PARAMETER)
  
  return deleteChat;  
}

module.exports = {
    insertAndFetchOneToOne,
    insertGroupChat,
    addToGroupChat,
    updateOne,
    findAllByUser,
    deleteFromGroupChat
}