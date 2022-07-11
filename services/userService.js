const {create,update,findOne,del} = require("../repositories/userRepository");
const {isObjEmpty,isString} = require("../libraries/utilities");
const ErrorHandler = require("../libraries/errorHandler")
const {ErrorCodes} = require("../libraries/enums");
const {hashPassword,isPasswordMatch}= require("../libraries/passwordHashing");
const {generateAccessToken} = require("../libraries/jwtEncryptAndDecrypt");
const User = require("../models/entities/user")

const insert = async (user)=>{
    if(isObjEmpty(user)){
        throw new ErrorHandler("USER object is empty!!",ErrorCodes.MISSING_PARAMETER)
    }
    user.password = await hashPassword(user.password) 
   return  new User(await create(user)) ;
}

const login = async (query)=>{
    if(isObjEmpty(query)){
        throw new ErrorHandler("USER object is empty!!",ErrorCodes.MISSING_PARAMETER)
    }
    const user = await findOne({username:query.username});
    if(isObjEmpty(user)){
        throw new ErrorHandler("User record not found!",ErrorCodes.NOT_FOUND)
    }
    
   const result = await isPasswordMatch(query.password,user.password)
   if(!result)throw new ErrorHandler("Wrong user login details!",ErrorCodes.FORBIDDEN)
   const customUser = {
    id:user.id,  
    username:user.username,
    user:user.name
   }
   const token = generateAccessToken(customUser)
   if(!isString(token))throw new ErrorHandler("Missing access token!",ErrorCodes.FORBIDDEN);
   await updateOne({_id:user.id},{isActive:true,modifiedAt: new Date()});
   return token;
}

const updateOne = async (filter,user)=>{
    if(isObjEmpty(filter) && isObjEmpty(user)){
        throw new ErrorHandler("USER object is empty!!",ErrorCodes.MISSING_PARAMETER)
    }
    user.modifiedAt = new Date();
    return  new User(await update(filter,user));
}

const logoutProcess = async (filter)=>{
    if(isObjEmpty(filter)){
        throw new ErrorHandler("USER object is empty!!",ErrorCodes.MISSING_PARAMETER)
    }
   const user = {
        isActive:false,
        modifiedAt: new Date()
    };
    return await update(filter,user);
}

const findOneByParams = async (query)=>{
    if(isObjEmpty(query)){
        throw new ErrorHandler("USER object is empty!!",ErrorCodes.MISSING_PARAMETER)
    }
    return new User(await findOne(query));
}
const deleteOne = async (query)=>{
    if(isObjEmpty(query)){
        throw new ErrorHandler("USER object is empty!!",ErrorCodes.MISSING_PARAMETER)
    }
    return await del(query);
}


module.exports = {insert,updateOne,findOneByParams,deleteOne,login,logoutProcess}