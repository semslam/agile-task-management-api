const { models, model } = require("mongoose");
const userSchema = require("../models/mongodb/userSchema"); 
const ErrorHandler = require("../libraries/errorHandler")
const {ErrorCodes} = require("../libraries/enums");

const create = async (query) =>{
    try {
        const user =  await userSchema.create(query);
        if(!user)throw new ErrorHandler("Can not create USER record!",ErrorCodes.MISSING_PARAMETER);
        return user  
    } catch (err) {
        throw new ErrorHandler(err.message,err.httpCode || ErrorCodes.INTERNAL_ERROR);
    } 
        
}
const update = async (filter, update) =>{
    try{
        const user = await userSchema.findOneAndUpdate(filter, update, {
            returnOriginal: false
          });

        if(!user)throw new ErrorHandler('USER record can not be updated!',ErrorCodes.MISSING_PARAMETER);
        return user;
    } catch (err) {
        throw new ErrorHandler(err.message,err.httpCode || ErrorCodes.INTERNAL_ERROR);
    } 
}

const findOne = async (query) =>{
    try {
        const user = await userSchema.findOne(query).exec();
    if(!user) throw new ErrorHandler("USER record doesn't exist!",ErrorCodes.MISSING_PARAMETER);
    return user;
    } catch (err) {
        throw new ErrorHandler(err.message,err.httpCode || ErrorCodes.INTERNAL_ERROR);
    }   
}
const find = async (query) =>{
    try {
        const user = await userSchema.find(query);
    if(!user) throw new ErrorHandler("USER records is empty!",ErrorCodes.MISSING_PARAMETER);
    return user;
    } catch (err) {
        throw new ErrorHandler(err.message,err.httpCode || ErrorCodes.INTERNAL_ERROR);
    } 
}

const del = async (query) =>{
    try {
        const user = await userSchema.deleteOne(query);
        if(!user) throw new ErrorHandler("Can't delete TODO record!",ErrorCodes.MISSING_PARAMETER);
        return user; 
    } catch (err) {
        throw new ErrorHandler(err.message,err.httpCode || ErrorCodes.INTERNAL_ERROR);
    } 
}

module.exports = {
    create,update,findOne,find,del
}