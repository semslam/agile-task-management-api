const {errorResponse} = require("../response/responseHandler");
const {ErrorCodes} = require("../libraries/enums");
const {isEmpty} = require("../libraries/utilities");
const {findOneByParams} = require("../services/userService")
const {decryptToken} = require("../libraries/jwtEncryptAndDecrypt")

const  authenticateToken = async (req, res, next)=> {
  try {
        const token = getToken(req, res);
        
        const user = await decryptToken(token);
        //fetch user access token secret from database
        //This approach is bad, it can slow the user request
        const fetchUser = await findOneByParams({username:user.username});
        if(!fetchUser.isActive){
            errorResponse(req, res,ErrorCodes.UNAUTHORIZED, "User is not Unauthorized, Please login!");
        }
        req.user = fetchUser;
        next();
    } catch (err) {
        errorResponse(req, res,err.httpCode || ErrorCodes.INTERNAL_ERROR, err.message);
    }
    
  }

  const getToken =(req, res)=>{
    const authHeader = req.headers['authorization']

    if (isEmpty(authHeader)) errorResponse(req, res,ErrorCodes.UNAUTHORIZED,"Unauthorized Access"); 
    const token = authHeader && authHeader.split(' ')[1];
    if (isEmpty(token)) errorResponse(req, res,ErrorCodes.UNAUTHORIZED,"Missing Signature Header"); 
    return token;
  }

  module.exports = {authenticateToken,getToken}