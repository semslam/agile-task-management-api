
const jwt = require("jsonwebtoken");
const {Config} = require("../configs/bootstrap");
const {ACCESS_TOKEN,SET_EXPIRE} =Config;
const {isObjEmpty,isEmpty,isString} = require("../libraries/utilities")
const ErrorHandler = require("../libraries/errorHandler")
const {ErrorCodes} = require("../libraries/enums")
/**
 * Generate access token
 * @param {Object} data 
 * @returns 
 */
const generateAccessToken =(data) =>{
        if(isObjEmpty(data)){
          throw new ErrorHandler("The access token is empty!!",ErrorCodes.MISSING_PARAMETER)
        }
        return jwt.sign(data,ACCESS_TOKEN, { expiresIn: SET_EXPIRE})// 60, "2 days", "10h", "7d" "50s" "365 days" 
  }

/**
 * Decrypt provided token
 * @param {String} token 
 * @returns 
 */
const decryptToken = (token)=>{
    if(isEmpty(token) && isString(token)){
      throw new ErrorHandler("The token most be empty or not a string!",ErrorCodes.MISSING_PARAMETER)
    }
   return jwt.verify(token, ACCESS_TOKEN, async (err, data) => {
        if(err) throw new ErrorHandler(err.message || "Wrong Token Authorization Header",ErrorCodes.MISSING_PARAMETER)
      return data
    });
}  

module.exports = {
    generateAccessToken,
    decryptToken
}