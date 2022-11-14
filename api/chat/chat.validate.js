const Joi = require("joi");
const {payloadValidateErrorResponse} = require("../../response/responseHandler");

const createGroupChatValidateReq = (req,res,next) =>{
    const schema = Joi.object({
        groupId:Joi.string().alphanum().required(),
        users:Joi.array().items(Joi.string().alphanum().required()).required(),
        chatName:Joi.string().min(2).max(65).required(),
        isGroupChat:Joi.boolean().valid(true).required()
      });
    const {error} = schema.validate(req.body);
    payloadValidateErrorResponse(req,res,next,error); 
}

const createOneOnOneChatValidateReq = (req,res,next) =>{
  const schema = Joi.object({
      userId:Joi.string().alphanum().required(),
      chatName:Joi.string().min(2).max(65).required(),
      isGroupChat:Joi.boolean().valid(false).required()
    });
  const {error} = schema.validate(req.body);
  payloadValidateErrorResponse(req,res,next,error); 
}

const updateChatValidateReq = (req,res,next) =>{
    const schema = Joi.object({
        id:Joi.string().alphanum().options(),
        users:Joi.array().items(Joi.string().alphanum().required()).options(),
        chatName:Joi.string().alphanum().min(2).max(65).options(),
      });
    const {error} = schema.validate(req.body);
    payloadValidateErrorResponse(req,res,next,error); 
}


module.exports = {
  createGroupChatValidateReq,
  createOneOnOneChatValidateReq,
  updateChatValidateReq
}