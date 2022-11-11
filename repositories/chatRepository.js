const chatSchema = require("../models/mongodb/chatSchema");
const ErrorHandler = require("../libraries/errorHandler");
const { ErrorCodes } = require("../libraries/enums");

const create = async (query) => {
  try {
    const chat = await chatSchema.create(query);
    if(!chat)throw new ErrorHandler("Can not create chat record!",ErrorCodes.MISSING_PARAMETER);
    return chat;
  } catch (err) {
    throw new ErrorHandler(err.message.includes("duplicate")?"The chat record already exist!":err.message,err.httpCode || ErrorCodes.UNPROCESSABLE);
  }
};
const update = async (filter, update) => {
  try {
    const chat = await chatSchema.findOneAndUpdate(filter, update, {
      returnOriginal: false,
    }); 
    console.log(chat);
    if (!chat) throw new ErrorHandler("chat record doesn't exist and it can't be update!",ErrorCodes.MISSING_PARAMETER);
    return chat;
  } catch (err) {
    throw new ErrorHandler(err.message.includes("Cast to ObjectId")?"The chat record doesn't exist!":err.message,err.httpCode || ErrorCodes.UNPROCESSABLE);
  }
};

const findOne = async (query) => {
  try {
    const chat = await chatSchema.findOne(query).exec();
    if (!chat) throw new ErrorHandler("Chat record doesn't exist!",ErrorCodes.MISSING_PARAMETER);
    return chat;
  } catch (err) {
    throw new ErrorHandler(err.message,err.httpCode || ErrorCodes.NOT_FOUND);
  }
};
const find = async (query) => {
  try {
    const chats = await chatSchema.find(query);
    console.log(chats)
    if (!chats) throw new ErrorHandler("Chat records is empty!",ErrorCodes.MISSING_PARAMETER);
    return chats;
  } catch (err) {
    throw new ErrorHandler(err.message,err.httpCode || ErrorCodes.NOT_FOUND);
  }
};
const del = async (query) => {
  try {
    const chat = await chatSchema.deleteOne(query);
    if (!chat)
      throw new ErrorHandler("Can't delete Chat record!",ErrorCodes.MISSING_PARAMETER);
    return chat;
  } catch (err) {
    throw new ErrorHandler(err.message,err.httpCode || ErrorCodes.UNPROCESSABLE);
  }
};

module.exports = {
  create,
  update,
  findOne,
  find,
  del,
};
