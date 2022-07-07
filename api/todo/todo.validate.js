const Joi = require("joi");
const {payloadValidateErrorResponse} = require("../../response/responseHandler");
const {Stages} = require("../../libraries/enums")

const addTodoValidateReq = (req,res,next) =>{
    const schema = Joi.object({
        summary: Joi.string().min(2).max(65).required(),
        description: Joi.string().min(15).max(8000).required(),
        cardColor:Joi.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).optional()
      });
    const {error} = schema.validate(req.body);
    payloadValidateErrorResponse(res,next,error); 
}

const updateTodoValidateReq = (req,res,next) =>{
    const schema = Joi.object({
        summary: Joi.string().min(2).max(65).required(),
        description: Joi.string().min(15).max(8000).optional(),
        cardColor:Joi.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).optional(),
        stage: Joi.string().valid(Stages.COMPLETE,Stages.PENDING,Stages.PROGRESS,Stages.REVIEW).optional(),
      });
    const {error} = schema.validate(req.body);
    payloadValidateErrorResponse(res,next,error); 
}


module.exports = {
    addTodoValidateReq,
    updateTodoValidateReq
}