const {create,update,findOne, del,find} = require("../repositories/todoRepository");
const {isObjEmpty} = require("../libraries/utilities");
const ErrorHandler = require("../libraries/errorHandler")
const {ErrorCodes,Stages} = require("../libraries/enums");
const Todo = require("../models/entities/todo")
const TodoExtra = require("../models/entities/todoExtra")

const insert = async (todo)=>{
    if(isObjEmpty(todo))
        throw new ErrorHandler("TODO object is empty!!",ErrorCodes.MISSING_PARAMETER)

    return new Todo(await create(todo));
}
//update process
const updateOne = async (filter,todo)=>{
    if(isObjEmpty(filter) || isObjEmpty(todo)) throw new ErrorHandler("TODO object is empty!!",ErrorCodes.MISSING_PARAMETER)
    if(todo.stage === Stages.COMPLETE) todo.isCompleted = true;
    todo.modifiedAt = new Date();
    return new TodoExtra(await update(filter,todo));
}

const findOneByParams = async (query)=>{
    if(isObjEmpty(query))
        throw new ErrorHandler("TODO query parameter is messing!!",ErrorCodes.MISSING_PARAMETER)
    
    return new TodoExtra(await findOne(query));
}

const findAll = async (query)=>{
    if(isObjEmpty(query))
        throw new ErrorHandler("TODO query parameter is messing!!",ErrorCodes.MISSING_PARAMETER)
    
    const allTodo = await find(query);
   return allTodo.map(todo => {
      return new TodoExtra(todo);
    })
}

const deleteOne = async (query)=>{
    if(isObjEmpty(query)) 
    throw new ErrorHandler("TODO query parameter is messing!!",ErrorCodes.MISSING_PARAMETER)
    const isDelete =  await del(query);

    if(!isDelete.deletedCount) throw new ErrorHandler("TODO does not delete!",ErrorCodes.MISSING_PARAMETER);
    return isDelete;
}

module.exports = {insert,updateOne,findOneByParams,findAll,deleteOne}
