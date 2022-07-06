const { models, model } = require("mongoose");
const userSchema = require("../models/mongodb/userSchema"); 
 
const create = async (query) =>{
    try {
        const user =  await userSchema.create(query);
        if(!user)throw new Error('Can not create USER record!');
        return user  
    } catch (err) {
        throw new Error(err.message);
    } 
        
}
const update = async (filter, update) =>{
        const user = await userSchema.findOneAndUpdate(filter, update, {
            returnOriginal: false
          });

    if(!user)throw new Error('USER record can not be updated!');
    return user;
}

const findOne = async (query) =>{
    const user = await userSchema.findOne(query).exec();
    if(!user) throw Error("USER record doesn't exist!");
    return user;   
}
const find = async (query) =>{
    const user = await userSchema.find(query);
    if(!user) throw Error("USER records is empty!");
    return user; 
}

const del = async (query) =>{
    const user = await userSchema.deleteOne(query);
    if(!user) throw Error("Can't delete TODO record!");
    return user; 
}

module.exports = {
    create,update,findOne,find,del
}