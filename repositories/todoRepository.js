const todoSchema = require("../models/mongodb/todoSchema");
const ErrorHandler = require("../libraries/errorHandler");
const { ErrorCodes } = require("../libraries/enums");

const create = async (query) => {
  try {
    const todo = await todoSchema.create(query);
    if(!todo)throw new ErrorHandler("Can not create TODO record!",ErrorCodes.MISSING_PARAMETER);
    return todo;
  } catch (err) {
    throw new ErrorHandler(err.message.includes("duplicate")?"The todo record already exist!":err.message,err.httpCode || ErrorCodes.UNPROCESSABLE);
  }
};
const update = async (filter, update) => {
  try {
    const todo = await todoSchema.findOneAndUpdate(filter, update, {
      returnOriginal: false,
    }); 
    console.log(todo);
    if (!todo) throw new ErrorHandler("TODO record doesn't exist and it can't be update!",ErrorCodes.MISSING_PARAMETER);
    return todo;
  } catch (err) {
    throw new ErrorHandler(err.message.includes("Cast to ObjectId")?"The todo record doesn't exist!":err.message,err.httpCode || ErrorCodes.UNPROCESSABLE);
  }
};

const findOne = async (query) => {
  try {
    const todo = await todoSchema.findOne(query).exec();
    if (!todo) throw new ErrorHandler("TODO record doesn't exist!",ErrorCodes.MISSING_PARAMETER);
    return todo;
  } catch (err) {
    throw new ErrorHandler(err.message,err.httpCode || ErrorCodes.NOT_FOUND);
  }
};
const find = async (query) => {
  try {
    const todo = await todoSchema.find(query);
    console.log(todo)
    if (!todo) throw new ErrorHandler("TODO records is empty!",ErrorCodes.MISSING_PARAMETER);
    return todo;
  } catch (err) {
    throw new ErrorHandler(err.message,err.httpCode || ErrorCodes.NOT_FOUND);
  }
};
const del = async (query) => {
  try {
    const todo = await todoSchema.deleteOne(query);
    if (!todo)
      throw new ErrorHandler("Can't delete TODO record!",ErrorCodes.MISSING_PARAMETER);
    return todo;
  } catch (err) {
    throw new ErrorHandler(err.message,err.httpCode || ErrorCodes.UNPROCESSABLE);
  }
};

const TodoModel = todoSchema;

module.exports = {
  create,
  update,
  findOne,
  find,
  del,
  TodoModel
};
