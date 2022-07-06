
const jwt = require("jsonwebtoken");
const {Config} = require("../configs/bootstrap");
const {ACCESS_TOKEN,SET_EXPIRE} =Config;
const {isObjEmpty,isEmpty,isString} = require("../libraries/utilities")
/**
 * Generate access token
 * @param {Object} data 
 * @returns 
 */
const generateAccessToken =(data) =>{
        if(isObjEmpty(data)){

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

    }
   return jwt.verify(token, ACCESS_TOKEN, async (err, user) => {
        if(err) throw err.message
      return user
    });
}  

module.exports = {
    generateAccessToken,
    decryptToken
}