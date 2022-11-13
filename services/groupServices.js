const {create,update, del, GroupModel} = require("../repositories/groupRepository");
const {isObjEmpty} = require("../libraries/utilities");
const ErrorHandler = require("../libraries/errorHandler")
const {ErrorCodes} = require("../libraries/enums");

const Group = require("../models/entities/group")

const insert = async (group)=>{
    if(isObjEmpty(group))
        throw new ErrorHandler("GROUP object is empty!!",ErrorCodes.MISSING_PARAMETER)

    return new Group(await create(group));
}
//update process
const updateOne = async (filter,group)=>{
    if(isObjEmpty(filter) || isObjEmpty(group)) 
        throw new ErrorHandler("GROUP object is empty!!",ErrorCodes.MISSING_PARAMETER)
    // group.totalPointAssignable
    group.modifiedAt = new Date();
    return new Group(await update(filter,group));
}

const findOneByParams = async (query)=>{
    if(isObjEmpty(query))
        throw new ErrorHandler("GROUP query parameter is messing!!",ErrorCodes.MISSING_PARAMETER)
    
    return new Group(await GroupModel.findOne(query).populate("adminId", "name username"));
   
}

const findAll = async (query)=>{
    if(isObjEmpty(query))
        throw new ErrorHandler("GROUP query parameter is messing!!",ErrorCodes.MISSING_PARAMETER)
    
    const allTodo = await GroupModel.find(query).populate("adminId", "name username");
   return allTodo.map(group => {
      return new Group(group);
    })
}

const deleteOne = async (query)=>{
    if(isObjEmpty(query)) 
    throw new ErrorHandler("GROUP query parameter is messing!!",ErrorCodes.MISSING_PARAMETER)
    const isDelete =  await del(query);

    if(!isDelete.deletedCount) throw new ErrorHandler("GROUP does not delete!",ErrorCodes.MISSING_PARAMETER);
    return isDelete;
}

module.exports = {insert,updateOne,findOneByParams,findAll,deleteOne}
