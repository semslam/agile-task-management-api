const Joi = require("joi");
const {payloadValidateErrorResponse} = require("../../response/responseHandler");

const addGroupValidateReq = (req,res,next) =>{
    const schema = Joi.object({
        topic: Joi.string().min(10).max(65).required(),
        // contentType:Joi.string().alphanum().valid("string","file","video","audio","rawData").required(),
        totalPoint:Joi.number().positive().greater(19).required(),
        totalNumberOfTicket:Joi.number().positive().greater(1).required(),
        status:Joi.boolean().truthy('true').falsy('false').sensitive().required(),
        // startDate: Joi.date().format('YYYY-MM-DDTHH:mm:ss').required(),
        // dueDate: Joi.date().format('YYYY-MM-DDTHH:mm:ss').required()
      });
    
    const {error} = schema.validate(req.body);
    payloadValidateErrorResponse(req,res,next,error); 
}

const updateGroupValidateReq = (req,res,next) =>{
    const schema = Joi.object({
      id:Joi.string().alphanum().required(),
      topic: Joi.string().min(10).max(65).optional(),
      // contentType:Joi.string().alphanum().valid("string","file","video","audio","rawData").required(),
      totalPoint:Joi.number().positive().greater(19).optional(),
      totalNumberOfTicket:Joi.number().positive().greater(1).optional(),
      status:Joi.boolean().truthy('true').falsy('false').sensitive().optional(),
      // startDate: Joi.date().format('YYYY-MM-DDTHH:mm:ss').required(),
      // dueDate: Joi.date().format('YYYY-MM-DDTHH:mm:ss').required()
    });
  
  const {error} = schema.validate(req.body);
  payloadValidateErrorResponse(req,res,next,error); 
}


module.exports = {
  addGroupValidateReq,
  updateGroupValidateReq
}