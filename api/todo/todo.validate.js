const Joi = require("joi").extend(require('@joi/date'));
const {payloadValidateErrorResponse} = require("../../response/responseHandler");
const {Stages,Priorities} = require("../../libraries/enums")
const {PENDING,PROGRESS,REVIEW,COMPLETE} = Stages;
const {IMPORTANT_NOT_URGENT,URGENT_AND_IMPORTANT,NOT_URGENT_NOT_IMPORTANT,URGENT_NOT_IMPORTANT} = Priorities;

const addTodoValidateReq = (req,res,next) =>{
    const schema = Joi.object({
        groupId:Joi.string().alphanum().required(),
        summary: Joi.string().min(20).max(150).required(),
        description: Joi.string().min(20).max(8000).required(),
        priorities:Joi.string().valid(IMPORTANT_NOT_URGENT,URGENT_AND_IMPORTANT,NOT_URGENT_NOT_IMPORTANT,URGENT_NOT_IMPORTANT).required(),
        point:Joi.number().positive().greater(0).required(),
        cardColor:Joi.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).optional(),
        startDate: Joi.date().iso().required(),
        dueDate: Joi.date().iso().greater(Joi.ref('startDate')).required()
      });

    const {error} = schema.validate(req.body);
    payloadValidateErrorResponse(req, res,next,error); 
}

const updateTodoValidateReq = (req,res,next) =>{
    const schema = Joi.object({
        id:Joi.string().alphanum().required(),
        groupId:Joi.string().alphanum().required(),
        summary: Joi.string().alphanum().min(2).max(65).optional(),
        description: Joi.string().alphanum().min(15).max(8000).optional(),
        priorities:Joi.string().alphanum().valid(IMPORTANT_NOT_URGENT,URGENT_AND_IMPORTANT,NOT_URGENT_NOT_IMPORTANT,URGENT_NOT_IMPORTANT).optional(),
        point:Joi.number().positive().greater(0).optional(),
        cardColor:Joi.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).optional(),
        stage: Joi.string().alphanum().valid(COMPLETE,PENDING,PROGRESS,REVIEW).optional(),
        startDate: Joi.date().iso().optional(),
        dueDate: Joi.date().iso().greater(Joi.ref('startDate')).optional()
      });
    const {error} = schema.validate(req.body);
    payloadValidateErrorResponse(req,res,next,error); 
}


module.exports = {
    addTodoValidateReq,
    updateTodoValidateReq
}