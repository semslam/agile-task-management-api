const { models, model } = require("mongoose");
const todoSchema = require("../models/mongodb/todoSchema"); 
 
const create = async (query) =>{
    try {
        return await todoSchema.create(query);  
    } catch (err) {
        throw new Error(err.message);
    } 
        
}
const update = async (filter, update) =>{
        const user = await todoSchema.findOneAndUpdate(filter, update, {
            returnOriginal: false
          });

    if(!user)throw new Error('It cannot update the user record');
    return user;
}

const findOne = async (query) =>{
    const user = await todoSchema.findOne(query).exec();
    if(!user) throw Error("It cannot find the user's record");
    return user;   
}
const find = async (query) =>{
    const users = await todoSchema.find(query);
    if(!users) throw Error("It cannot find users' records");
    return users; 
}

module.exports = {
    create,update,findOne,find
}