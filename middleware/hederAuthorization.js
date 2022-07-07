const {errorResponse} = require("../response/responseHandler");
const {ErrorCodes} = require("../libraries/enums");
const {isEmpty} = require("../libraries/utilities");
const {findOneByParams} = require("../services/userService")
const {decryptToken} = require("../libraries/jwtEncryptAndDecrypt")

const  authenticateToken = async (req, res, next)=> {
  try {
        const token = getToken(req, res);
    
        //fetch user access token secret from database
        const user = await decryptToken(token)
        //This approach is bad, it can slow the user request
        const fetchUser = await findOneByParams({username:user.username});
        if(!fetchUser.isActive){
            errorResponse(res,ErrorCodes.FORBIDDEN, "User need to login!");
        }
        req.user = fetchUser;
        next();
    } catch (err) {
        errorResponse(res,ErrorCodes.INTERNAL_ERROR, err.message);
    }
    
  }

  const getToken =(req, res)=>{
    const authHeader = req.headers['authorization']

    if (isEmpty(authHeader)) errorResponse(res,ErrorCodes.NOT_FOUND,"Missing Authorization Header"); 
    const token = authHeader && authHeader.split(' ')[1]
    if (isEmpty(token)) errorResponse(res,ErrorCodes.NOT_FOUND,"Missing Signature Header"); 
    return token;
  }

  module.exports = {authenticateToken,getToken}