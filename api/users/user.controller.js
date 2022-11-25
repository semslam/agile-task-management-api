const userService = require("../../services/userService");
const {successResponse,errorResponse} = require("../../response/responseHandler");
const {HttpCodes} = require("../../libraries/enums")
const ResizeImage = require("../../libraries/resizeImage")


const searchUsers = async (req, res)=>{
    try {

        const users = await userService.search(req.query.search, req.user.id);
        successResponse(req, res,HttpCodes.CREATED,"Search successful!!",users)
    } catch (error) {
        errorResponse(req,res,err.httpCode,err.message);
    }
}

const createUser = async (req, res)=>{

    try {
        
        
    //    const userResult = await userService.insert(req.body);
        successResponse(req, res,HttpCodes.CREATED,"User was successful created!!",req.body) 
    } catch (err) {
        errorResponse(req,res,err.httpCode || 400,err.message);
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

        successResponse(req,res,HttpCodes.OK,"User was successful login!",{user:userToken}) 
    } catch (err) {
        errorResponse(req,res,err.httpCode || 400,err.message);
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

const uploadImage  = async (req,res)=>{
    try {
        console.log(req.file)
        console.log(req.image)
        console.log(req.body.image)
        
        
       let user = {
        image:req.image
       }
        if (image) {
            const imagePath = path.join(__dirname, '../images/users');
            const fileUpload = new ResizeImage(imagePath);
            const filename = await fileUpload.save(req.image.buffer);
            user.image = filename;
          }
       
        
       const userResult = await userService.updateOne({_id:req.user.id},user);
        successResponse(req, res,HttpCodes.CREATED,"User image was successful uploaded!!",userResult) 
    } catch (err) {
        errorResponse(req,res,err.httpCode || 400,err.message);
    }
}


module.exports = {
    searchUsers,
    createUser,
    loginUser,
    logoutUser,
    updateUser,
    uploadImage
}