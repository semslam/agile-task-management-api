const messageSchema = require("../models/mongodb/messageSchema");
const ErrorHandler = require("../libraries/errorHandler");
const { ErrorCodes } = require("../libraries/enums");

const create = async (query) => {
  try {
    const message = await messageSchema.create(query);
    if(!message)throw new ErrorHandler("Can not create message record!",ErrorCodes.MISSING_PARAMETER);
    return message;
  } catch (err) {
    throw new ErrorHandler(err.message.includes("duplicate")?"The message record already exist!":err.message,err.httpCode || ErrorCodes.UNPROCESSABLE);
  }
};
const update = async (filter, update) => {
  try {
    const message = await messageSchema.findOneAndUpdate(filter, update, {
      returnOriginal: false,
    }); 
    console.log(message);
    if (!message) throw new ErrorHandler("Message record doesn't exist and it can't be update!",ErrorCodes.MISSING_PARAMETER);
    return message;
  } catch (err) {
    throw new ErrorHandler(err.message.includes("Cast to ObjectId")?"The message record doesn't exist!":err.message,err.httpCode || ErrorCodes.UNPROCESSABLE);
  }
};

const findOne = async (query) => {
  try {
    const message = await messageSchema.findOne(query).exec();
    if (!message) throw new ErrorHandler("Message record doesn't exist!",ErrorCodes.MISSING_PARAMETER);
    return message;
  } catch (err) {
    throw new ErrorHandler(err.message,err.httpCode || ErrorCodes.NOT_FOUND);
  }
};
const find = async (query) => {
  try {
    const messages = await messageSchema.find(query);
    console.log(messages)
    if (!messages) throw new ErrorHandler("Message records is empty!",ErrorCodes.MISSING_PARAMETER);
    return messages;
  } catch (err) {
    throw new ErrorHandler(err.message,err.httpCode || ErrorCodes.NOT_FOUND);
  }
};
const del = async (query) => {
  try {
    const message = await messageSchema.deleteOne(query);
    if (!message)
      throw new ErrorHandler("Can't delete message record!",ErrorCodes.MISSING_PARAMETER);
    return message;
  } catch (err) {
    throw new ErrorHandler(err.message,err.httpCode || ErrorCodes.UNPROCESSABLE);
  }
};
const MessageModel = messageSchema;
module.exports = {
  create,
  update,
  findOne,
  find,
  del,
  MessageModel
};
