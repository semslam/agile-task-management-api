const bcrypt = require("bcrypt");
const {isObjEmpty,isEmpty,isString} = require("../libraries/utilities")
 
/**
 * Hash the provided password
 * @param {String} password 
 * @returns return password hash
 */
const hashPassword = async (password)=>{
    if(isEmpty(password) || !isString(password)){
        throw new Error("Password can't be empty and it most be a string")
    }
       return await bcrypt.hash(password, await bcrypt.genSalt());  
}
/**
 * Check if the provided password and hash password matched
 * @param {String} clientPassword 
 * @param {String} hashedPassword 
 * @returns return boolean
 */
const isPasswordMatch = async (clientPassword,hashedPassword)=>{
    if((isEmpty(clientPassword) || !isString(clientPassword)) || (isEmpty(hashedPassword) || !isString(hashedPassword))){
        throw new Error("Password or hash and it most be a strings")
    }
     return await bcrypt.compare(clientPassword,hashedPassword);
    
}

module.exports = {
    hashPassword,
    isPasswordMatch,
}