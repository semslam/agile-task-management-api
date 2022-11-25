const {create,update,findOne,del,UserModel} = require("../repositories/userRepository");
const {isObjEmpty,isString} = require("../libraries/utilities");
const ErrorHandler = require("../libraries/errorHandler")
const {ErrorCodes, Gender} = require("../libraries/enums");
const {hashPassword,isPasswordMatch}= require("../libraries/passwordHashing");
const {generateAccessToken} = require("../libraries/jwtEncryptAndDecrypt");
const User = require("../models/entities/user")


const search = async (keyword,userId)=>{
    if(isObjEmpty(keyword))
        throw new ErrorHandler("Keyword is empty!!",ErrorCodes.MISSING_PARAMETER)

        console.log(keyword,userId);

        const search = keyword
        ? {
            $or: [
              { name: { $regex: keyword, $options: "i" } },
              { username: { $regex: keyword, $options: "i" } },
            ],
          }
        : {};
    const users = await UserModel.find(search).find({ _id: { $ne: userId } });
    return users.map(user => {
        return new User(user);})    
}

const insert = async (user)=>{
    if(isObjEmpty(user)){
        throw new ErrorHandler("USER object is empty!!",ErrorCodes.MISSING_PARAMETER)
    }
    user.image = (user.gender === Gender.MALE)? "https://www.freeiconspng.com/uploads/male-icon-4.jpg":"https://www.freeiconspng.com/uploads/female-icon-11.jpg"
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
    name:user.name,
    gender:user.gender,
    isActive:user.isActive
   }
    const token = generateAccessToken(customUser);
    
   if(!isString(token))throw new ErrorHandler("Missing access token!",ErrorCodes.FORBIDDEN);
   await updateOne({_id:user.id},{isActive:true,modifiedAt: new Date()});
   customUser.image = user.image
   customUser.token = token
   return customUser;
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


module.exports = {
    search,
    insert,
    updateOne,
    findOneByParams,
    deleteOne,
    login,
    logoutProcess
}