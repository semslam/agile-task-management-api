const {create,update, del,TodoModel} = require("../repositories/todoRepository");
const {findOne:findOneGroup,update:updateGroup ,GroupModel} = require("../repositories/groupRepository");
const {isObjEmpty} = require("../libraries/utilities");
const ErrorHandler = require("../libraries/errorHandler")
const {ErrorCodes,Stages} = require("../libraries/enums");
const Todo = require("../models/entities/todo")
const Group = require("../models/entities/group")

const insert = async (todo)=>{
   
    if(isObjEmpty(todo))
        throw new ErrorHandler("TODO object is empty!!",ErrorCodes.MISSING_PARAMETER)

    const group = await findOneGroup({_id:todo.groupId,adminId:todo.userId})
    
    if(!group.status)
        throw new ErrorHandler("The group is not active, you can't create todo",ErrorCodes.MISSING_PARAMETER)

        
    const remainPoint = (group.totalPoint - group.totalPointAssignable); 
    if(todo.point > remainPoint)
        throw new ErrorHandler(`You have exceed group point, ${(remainPoint)? `${remainPoint} point available`:"you can't create todo"}`,ErrorCodes.MISSING_PARAMETER);

    if(group.totalNumberOfTicketCreated > group.totalNumberOfTicket)
        throw new ErrorHandler("You have exceed ticket number, you can't create todo",ErrorCodes.MISSING_PARAMETER) 
        // use transaction
        let groupObject = {};
        groupObject.totalPointAssignable = (group.totalPointAssignable + todo.point);
        groupObject.totalNumberOfTicketCreated = (group.totalNumberOfTicketCreated + 1)
        groupObject.modifiedAt = new Date();
    
    const todoRecord = new Todo(await create(todo));
    await updateGroup({_id:todo.groupId},groupObject);
    
    return todoRecord;
}
//update process
const updateOne = async (filter,todo)=>{
        if(isObjEmpty(filter) || isObjEmpty(todo)) 
            throw new ErrorHandler("TODO object is empty!!",ErrorCodes.MISSING_PARAMETER);
        
        const todoRecord = await TodoModel.findOne({_id:todo.id,groupId:todo.groupId}).populate("groupId", "adminId totalPointAssignable totalPoint totalNumberOfTicket totalNumberOfTicketCreated")

        const previousPoint = (todoRecord.groupId.totalPointAssignable - todoRecord.point); 
        let groupObject = {};

        if(todo.point){
            if(todo.point > previousPoint)
                throw new ErrorHandler(`You have exceed group point, ${(previousPoint)? `${previousPoint} point available`:"you can't create todo"}`,ErrorCodes.MISSING_PARAMETER);

            groupObject.totalPointAssignable = (previousPoint + todo.point);
            groupObject.modifiedAt = new Date();
            await updateGroup({_id:todo.groupId},groupObject);
        }
            
        
        if(todo?.stage === Stages.COMPLETE) 
            todo.isCompleted = true;
        else if(todo?.stage !== Stages.COMPLETE && todoRecord.isCompleted)
            todo.isCompleted = false;

        todo.modifiedAt = new Date();
        const todoData = new Todo(await update(filter,todo));

    return todoData;
}

const findOneByParams = async (query)=>{
    if(isObjEmpty(query))
        throw new ErrorHandler("TODO query parameter is messing!!",ErrorCodes.MISSING_PARAMETER)
    
    return new Todo(await TodoModel.findOne(query).populate("groupId", "topic adminId totalPointAssignable totalPoint totalNumberOfTicket totalNumberOfTicketCreated"));
}

const findAll = async (query)=>{
    if(isObjEmpty(query))
        throw new ErrorHandler("TODO query parameter is messing!!",ErrorCodes.MISSING_PARAMETER)
    
    const allTodo = await TodoModel.find(query).populate("groupId", "topic adminId totalPointAssignable totalPoint totalNumberOfTicket totalNumberOfTicketCreated");
   return allTodo.map(todo => {
      return new Todo(todo);
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
