
const jwt = require("jsonwebtoken");
const {Config} = require("../configs/bootstrap");
const {ACCESS_TOKEN,SET_EXPIRE} =Config;
const {isObjEmpty,isEmpty,isString,isObject,isObjectContainUndefine} = require("../libraries/utilities")
/**
 * Generate access token
 * @param {object} data 
 * @returns return a string signature
 */
const generateAccessToken =(data) =>{
        if(isEmpty(data) || !isObject(data) || isObjEmpty(data))
          throw new Error("The jwt token object can't be empty!!")
        
        if(isObjectContainUndefine(data)) throw new Error("The jwt token object can't contain undefine property!!")
        return jwt.sign(data,ACCESS_TOKEN, { expiresIn: SET_EXPIRE})// 60, "2 days", "10h", "7d" "50s" "365 days" 
  }

/**
 * Decrypt provided token string
 * @param {String} token 
 * @returns return token object
 */
const decryptToken = (token)=>{
    if(isEmpty(token) || !isString(token)){
      throw new Error("The token can't be an empty and most be a string!")
    }
   return jwt.verify(token, ACCESS_TOKEN, async (err, data) => {
        if(err) throw new Error(err.message || "Wrong jwt token signature")
      return data
    });
}  

module.exports = {
    generateAccessToken,
    decryptToken
}