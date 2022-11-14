const Joi = require("joi");
const {payloadValidateErrorResponse} = require("../../response/responseHandler");
const {Stages,Priorities} = require("../../libraries/enums")

const addNewMessageValidateReq = (req,res,next) =>{
    const schema = Joi.object({
        content: Joi.string().min(1).max(10000).required(),
        chatId: Joi.string().alphanum().required()
      });
    const {error} = schema.validate(req.body);
    payloadValidateErrorResponse(req,res,next,error); 
}

const updateGroupValidateReq = (req,res,next) =>{
    const schema = Joi.object({
        name: Joi.string().alphanum().min(2).max(65).options(),
        priorities:Joi.string().alphanum().valid(Priorities.IMPORTANT_NOT_URGENT,Priorities.URGENT_AND_IMPORTANT,Priorities.NOT_URGENT_NOT_IMPORTANT,Priorities.URGENT_NOT_IMPORTANT).optional(),
        totalPoint:Joi.number().positive().greater(19).required(),
        totalNumberOfTicket:Joi.number().positive().greater(1).options(),
        startDate: Joi.date().format('YYYY-MM-DDTHH:mm:ss').options({ convert: false }),
        dueDate: Joi.date().format('YYYY-MM-DDTHH:mm:ss').options({ convert: false })
      });
    const {error} = schema.validate(req.body);
    payloadValidateErrorResponse(req,res,next,error); 
}


module.exports = {
  addNewMessageValidateReq,
  updateGroupValidateReq
}