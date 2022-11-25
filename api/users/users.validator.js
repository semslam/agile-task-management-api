const Joi = require("joi");
const {payloadValidateErrorResponse} = require("../../response/responseHandler");
const {Gender} = require("../../libraries/enums")

const onBoardValidateReq = (req,res,next) =>{
    const schema = Joi.object({
        name: Joi.string().min(2).max(30).required(),
        username: Joi.string().email().required(),
        gender:Joi.string().valid(Gender.MALE,Gender.FEMALE).required(),
        // image: Joi.any().optional(),
        password:Joi.string().min(7).max(30).required()
      });
    const {error} = schema.validate(req.body);
    payloadValidateErrorResponse(req, res,next,error); 
}

const updateValidateReq = (req,res,next) =>{
    const schema = Joi.object({
        name: Joi.string().min(2).max(30).optional(),
        gender:Joi.string().valid(Gender.MALE,Gender.FEMALE).optional(),
        // image:Joi.any().optional()
      });
    const {error} =  schema.validate(req.body);
    payloadValidateErrorResponse(req, res,next,error); 
}

const loginValidateReq = (req,res,next) =>{
    const schema = Joi.object({
        username: Joi.string().email().required(),
        password:Joi.string().min(7).max(30).required()
      });
    const {error} =  schema.validate(req.body);
    payloadValidateErrorResponse(req, res,next,error); 
}

module.exports = {
    onBoardValidateReq,
    updateValidateReq,
    loginValidateReq
}