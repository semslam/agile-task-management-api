const Joi = require("joi");
const {payloadValidateErrorResponse} = require("../../response/responseHandler");

const createGroupChatValidateReq = (req,res,next) =>{
    const schema = Joi.object({
        groupId:Joi.string().alphanum().required(),
        users:Joi.array().items(Joi.string().alphanum().required()).required(),
        chatName:Joi.string().min(2).max(65).required()
      });
    const {error} = schema.validate(req.body);
    payloadValidateErrorResponse(req,res,next,error); 
}

const createOneOnOneChatValidateReq = (req,res,next) =>{
  const schema = Joi.object({
      userId:Joi.string().alphanum().required(),
      chatName:Joi.string().min(2).max(65).optional()
    });
  const {error} = schema.validate(req.body);
  payloadValidateErrorResponse(req,res,next,error); 
}

const renameGroupChatValidateReq = (req,res,next) =>{
    const schema = Joi.object({
        chatId:Joi.string().alphanum().required(),
        chatName:Joi.string().min(2).max(65).required(),
      });
    const {error} = schema.validate(req.body);
    payloadValidateErrorResponse(req,res,next,error); 
}


const removeAndUserFromGroupChatValidateReq = (req,res,next) =>{
  const schema = Joi.object({
      userId:Joi.string().alphanum().required(),
      chatId:Joi.string().alphanum().required(),
    });
  const {error} = schema.validate(req.body);
  payloadValidateErrorResponse(req,res,next,error); 
}


module.exports = {
  createGroupChatValidateReq,
  createOneOnOneChatValidateReq,
  renameGroupChatValidateReq,
  removeAndUserFromGroupChatValidateReq
}