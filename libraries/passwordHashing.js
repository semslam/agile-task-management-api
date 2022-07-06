const bcrypt = require("bcrypt");
const {isObjEmpty,isEmpty,isString} = require("../libraries/utilities")
 
/**
 * Hash the provided password
 * @param {String} password 
 * @returns 
 */
const hashPassword = async (password)=>{
    if(isEmpty(password) && isString(password)){

    }
       return await bcrypt.hash(password, await bcrypt.genSalt());  
}
/**
 * Check if the provided password and hash password match
 * @param {String} clientPassword 
 * @param {String} hashedPassword 
 * @returns 
 */
const isPasswordMatch = async (clientPassword,hashedPassword)=>{
    if((isEmpty(clientPassword) && isString(clientPassword)) || (isEmpty(hashedPassword) && isString(hashedPassword))){

    }
     return await bcrypt.compare(clientPassword,hashedPassword);
    
}

module.exports = {
    hashPassword,
    isPasswordMatch,
}