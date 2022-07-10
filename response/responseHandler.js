const {convertDateToTimeStamp} = require("../libraries/dateFormat");
const {isEmpty} = require("../libraries/utilities")

const STATUS_FAILED = "Failed";
const STATUS_SUCCESS = "Successful";

const successResponse = (req, res,HTTP_SUCCESS,successMessage, data = null) =>{
    
    let response = {
        timestamp: convertDateToTimeStamp(new Date()),
        code: HTTP_SUCCESS,
        path:req.originalUrl,
        method:req.method,
        status:STATUS_SUCCESS,
        message:successMessage
      }
      
      if(!isEmpty(data)) response.data = data;
      console.log(response);
      if(res.writableEnded)return;
   return res.status(HTTP_SUCCESS).send(response);
}

const errorResponse = (req, res,HTTP_ERROR,errorMessage) =>{
    
      const response = {
        timestamp: convertDateToTimeStamp(new Date()),
        code: HTTP_ERROR,
        path:req.originalUrl,
        method:req.method,
        status:STATUS_FAILED,
        message:errorMessage
      }
      console.log(response);
      if(res.writableEnded)return;

   return res.status(HTTP_ERROR).send(response);    
}

const payloadValidateErrorResponse = (req, res,next,error) =>{
    if(!isEmpty(error)){
        const response = {
            timestamp: convertDateToTimeStamp(new Date()),
            code: 422,
            path:req.originalUrl,
            method:req.method,
            status:STATUS_FAILED,
            message:error.details[0].message
          }
        console.log(response);
        if(res.writableEnded)return;
      return res.status(422).json(response);
    }
    if(res.writableEnded)return;
    next();
}


 module.exports = {
    successResponse,
    errorResponse,
    payloadValidateErrorResponse
}