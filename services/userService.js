const {create,update,findOne,del} = require("../repositories/todoRepository");

const insert = async (user)=>{
    await create(user);
    return true

}

const updateOne = async (filter,user)=>{
    user.modifiedAt;
    await update(filter,user);
    return true

}

const findOneByParams = async (query)=>{
    return await findOne(query);
}
const deleteOne = async (query)=>{
    return await del(query);
}


module.exports = {insert,updateOne,findOneByParams,deleteOne}