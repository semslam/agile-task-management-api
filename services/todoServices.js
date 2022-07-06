const {create,update,findOne, del} = require("../repositories/todoRepository");

const insert = async (todo)=>{
    await create(todo);
    return true

}

const updateOne = async (filter,todo)=>{
    todo.modifiedAt;
    await update(filter,todo);
    return true

}

const findOneByParams = async (query)=>{
    return await findOne(query);
}

const findAll = async (query)=>{
    return await findOne(query);
}

const deleteOne = async (query)=>{
    return await del(query);
}

module.exports = {insert,updateOne,findOneByParams,findAll,deleteOne}
