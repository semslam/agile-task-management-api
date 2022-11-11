const Joi = require("joi");
const {payloadValidateErrorResponse} = require("../../response/responseHandler");
const {Stages} = require("../../libraries/enums")

const addTodoValidateReq = (req,res,next) =>{
    const schema = Joi.object({
        summary: Joi.string().alphanum().min(2).max(65).required(),
        groupId:Joi.string().min(25).max(65).required(),
        description: Joi.string().alphanum().min(15).max(8000).required(),
        point:Joi.number().positive().greater(0).required(),
        cardColor:Joi.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).optional(),
        startDate: Joi.date().format('YYYY-MM-DDTHH:mm:ss').options({ convert: false }),
        dueDate: Joi.date().format('YYYY-MM-DDTHH:mm:ss').options({ convert: false })
      });
    const {error} = schema.validate(req.body);
    payloadValidateErrorResponse(req, res,next,error); 
}

const updateTodoValidateReq = (req,res,next) =>{
    const schema = Joi.object({
        summary: Joi.string().alphanum().min(2).max(65).required(),
        groupId:Joi.string().min(25).max(65).optional(),
        description: Joi.string().alphanum().min(15).max(8000).optional(),
        point:Joi.number().positive().greater(0).required(),
        cardColor:Joi.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).optional(),
        stage: Joi.string().alphanum().valid(Stages.COMPLETE,Stages.PENDING,Stages.PROGRESS,Stages.REVIEW).optional(),
        dueDate: Joi.date().format('YYYY-MM-DDTHH:mm:ss').options({ convert: false })
      });
    const {error} = schema.validate(req.body);
    payloadValidateErrorResponse(req,res,next,error); 
}


module.exports = {
    addTodoValidateReq,
    updateTodoValidateReq
}