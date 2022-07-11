const userService = require("../../services/userService");
const {successResponse,errorResponse} = require("../../response/responseHandler");
const {HttpCodes} = require("../../libraries/enums")

const createUser = async (req, res)=>{

    try {
        const user = req.body;
       const userResult = await userService.insert(user);
        successResponse(req, res,HttpCodes.CREATED,"User was successful created!!",userResult) 
    } catch (err) {
        errorResponse(req,res,err.httpCode,err.message);
    }
}


const updateUser = async (req, res)=>{
    try {

        const filter ={
            userId:req.user.id,
        }
        const user = req.body;
       const userResult = await userService.updateOne(filter,user);
      successResponse(req,res,HttpCodes.OK,"User was successful updated!",userResult) 
    } catch (err) {
        errorResponse(req,res,err.httpCode,err.message);
    }
}

const loginUser = async (req,res)=>{
    try {
        const loginDetails = req.body;
        console.log(loginDetails)
      const userToken = await userService.login(loginDetails);

        successResponse(req,res,HttpCodes.OK,"User was successful login!",{userAccessToken:userToken}) 
    } catch (err) {
        errorResponse(req,res,err.httpCode,err.message);
    }
}

const logoutUser = async (req,res)=>{
    try {
        const filter ={
            userId:req.user.id,
        }
      await userService.logoutProcess(filter);
      successResponse(req,res,HttpCodes.OK,"User was successful logout!") 
    } catch (err) {
        errorResponse(req,res,err.httpCode,err.message);
    }
}


module.exports = {
    createUser,
    loginUser,
    logoutUser,
    updateUser
}