const {convertDateToTimeStamp} = require("../libraries/dateFormat");
const {isEmpty} = require("../libraries/utilities")

const STATUS_FAILED = "Failed";
const STATUS_SUCCESS = "Successful";
let response = {
    timestamp: convertDateToTimeStamp(new Date()),
    status:STATUS_FAILED
  }

const successResponse = (res,HTTP_SUCCESS,successMessage, data = null) =>{
      response.code = HTTP_SUCCESS
      response.status = STATUS_SUCCESS
      response.message = successMessage;
      if(!isEmpty(data))  response.data = data;
      console.log(response);
      if(res.writableEnded)return;
      const result = response;
        response = {}
   return res.status(HTTP_SUCCESS).send(result);
}

const errorResponse = (res,HTTP_ERROR,errorMessage) =>{
      response.code = HTTP_ERROR
      response.message = errorMessage;
      console.log(response);
      if(res.writableEnded)return;
    const result = response;
    response = {}
   return res.status(HTTP_ERROR).send(result);    
}

const payloadValidateErrorResponse = (res,next,error) =>{
    if(!isEmpty(error)){
        console.log(result);
        response.code = 422
        response.message = error.details[0].message;
        console.log(response);
        if(res.writableEnded)return;
      const result = response;
      response = {}
      return res.status(422).json(result);
    }
    if(res.writableEnded)return;
    next();
}


 module.exports = {
    successResponse,
    errorResponse,
    payloadValidateErrorResponse
}