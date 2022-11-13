const groupSchema = require("../models/mongodb/groupSchema");
const ErrorHandler = require("../libraries/errorHandler");
const { ErrorCodes } = require("../libraries/enums");

const create = async (query) => {
  try {
    const group = await groupSchema.create(query);
    if(!group)throw new ErrorHandler("Can not create group record!",ErrorCodes.MISSING_PARAMETER);
    return group;
  } catch (err) {
    throw new ErrorHandler(err.message.includes("duplicate")?"The group record already exist!":err.message,err.httpCode || ErrorCodes.UNPROCESSABLE);
  }
};
const update = async (filter, update) => {
  try {
    console.log(filter,update);
    const group = await groupSchema.findOneAndUpdate(filter, update, {
      returnOriginal: false,
    }); 
    console.log(group);
    if (!group) throw new ErrorHandler("GROUP record doesn't exist and it can't be update!",ErrorCodes.MISSING_PARAMETER);
    return group;
  } catch (err) {
    throw new ErrorHandler(err.message.includes("Cast to ObjectId")?"The group record doesn't exist!":err.message,err.httpCode || ErrorCodes.UNPROCESSABLE);
  }
};

const findOne = async (query) => {
  try {
    const group = await groupSchema.findOne(query).exec();
    if (!group) throw new ErrorHandler("GROUP record doesn't exist!",ErrorCodes.MISSING_PARAMETER);
    return group;
  } catch (err) {
    throw new ErrorHandler(err.message,err.httpCode || ErrorCodes.NOT_FOUND);
  }
};
const find = async (query) => {
  try {
    const group = await groupSchema.find(query);
    console.log(group)
    if (!group) throw new ErrorHandler("GROUP records is empty!",ErrorCodes.MISSING_PARAMETER);
    return group;
  } catch (err) {
    throw new ErrorHandler(err.message,err.httpCode || ErrorCodes.NOT_FOUND);
  }
};
const del = async (query) => {
  try {
    const group = await groupSchema.deleteOne(query);
    if (!group)
      throw new ErrorHandler("Can't delete GROUP record!",ErrorCodes.MISSING_PARAMETER);
    return group;
  } catch (err) {
    throw new ErrorHandler(err.message,err.httpCode || ErrorCodes.UNPROCESSABLE);
  }
};
const GroupModel = groupSchema;
module.exports = {
  create,
  update,
  findOne,
  find,
  del,
  GroupModel
};
