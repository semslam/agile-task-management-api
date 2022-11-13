const {ErrorCodes} = require("./enums");

module.exports = class ErrorHandler extends Error{
     httpCode;
    constructor(message,httpCode){
        super(message)
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name; 
        this.message = message || 'Something went wrong. Please try again.';
        this.httpCode = httpCode || ErrorCodes.INTERNAL_ERROR;

        this.errorLog(message,this)
    }


    errorLog(message,stackTrace){
        //name, message, httpCode, errorLevel
        console.log("<<<<=============Start================>>>>");
        console.error(message);
        console.error(stackTrace);
        console.log("<<<<=============End================>>>>");
    }
   
}