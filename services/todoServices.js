const {create,update,findOne, del} = require("../repositories/todoRepository");
const {isObjEmpty} = require("../libraries/utilities");
const ErrorHandler = require("../libraries/errorHandler")
const {ErrorCodes} = require("../libraries/enums");

const insert = async (todo)=>{
    if(isObjEmpty(todo)){
        throw new ErrorHandler("TODO object is empty!!",ErrorCodes.MISSING_PARAMETER)
    }
    return await create(todo);
}

const updateOne = async (filter,todo)=>{
    if(isObjEmpty(filter) && isObjEmpty(todo)){
        throw new ErrorHandler("TODO object is empty!!",ErrorCodes.MISSING_PARAMETER)
    }
    todo.modifiedAt;
    await update(filter,todo);
    return true

}

const findOneByParams = async (query)=>{
    if(isObjEmpty(query)){
        throw new ErrorHandler("TODO query parameter is messing!!",ErrorCodes.MISSING_PARAMETER)
    }
    return await findOne(query);
}

const findAll = async (query)=>{
    if(isObjEmpty(query)){
        throw new ErrorHandler("TODO query parameter is messing!!",ErrorCodes.MISSING_PARAMETER)
    }
    return await findOne(query);
}

const deleteOne = async (query)=>{
    if(isObjEmpty(query)){
        throw new ErrorHandler("TODO query parameter is messing!!",ErrorCodes.MISSING_PARAMETER)
    }
    return await del(query);
}

module.exports = {insert,updateOne,findOneByParams,findAll,deleteOne}
