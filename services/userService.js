const {create,update,findOne,del} = require("../repositories/todoRepository");
const ErrorHandler = require("../libraries/errorHandler")
const {ErrorCodes} = require("../libraries/enums");

const insert = async (user)=>{
    if(isObjEmpty(user)){
        throw new ErrorHandler("USER object is empty!!",ErrorCodes.MISSING_PARAMETER)
    }
    await create(user);
    return true

}

const updateOne = async (filter,user)=>{
    if(isObjEmpty(filter) && isObjEmpty(user)){
        throw new ErrorHandler("USER object is empty!!",ErrorCodes.MISSING_PARAMETER)
    }
    user.modifiedAt;
    await update(filter,user);
    return true

}

const findOneByParams = async (query)=>{
    if(isObjEmpty(query)){
        throw new ErrorHandler("USER object is empty!!",ErrorCodes.MISSING_PARAMETER)
    }
    return await findOne(query);
}
const deleteOne = async (query)=>{
    if(isObjEmpty(query)){
        throw new ErrorHandler("USER object is empty!!",ErrorCodes.MISSING_PARAMETER)
    }
    return await del(query);
}


module.exports = {insert,updateOne,findOneByParams,deleteOne}