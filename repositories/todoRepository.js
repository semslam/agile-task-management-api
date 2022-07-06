const { models, model } = require("mongoose");
const todoSchema = require("../models/mongodb/todoSchema"); 
 
const create = async (query) =>{
    try {
        const todo =  await todoSchema.create(query);
        if(!todo)throw new Error('Can not create TODO record!');
        return todo  
    } catch (err) {
        throw new Error(err.message);
    } 
        
}
const update = async (filter, update) =>{
        const todo = await todoSchema.findOneAndUpdate(filter, update, {
            returnOriginal: false
          });
    console.log(todo);
    if(!todo)throw new Error('TODO record can not be updated!');
    return todo;
}

const findOne = async (query) =>{
    const todo = await todoSchema.findOne(query).exec();
    if(!todo) throw Error("TODO record doesn't exist!");
    return todo;   
}
const find = async (query) =>{
    const todo = await todoSchema.find(query);
    if(!todo) throw Error("TODO records is empty!");
    return todo; 
}
const del = async (query) =>{
    const todo = await todoSchema.deleteOne(query);
    if(!todo) throw Error("Can't delete TODO record!");
    return todo; 
}

module.exports = {
    create,update,findOne,find,del
}