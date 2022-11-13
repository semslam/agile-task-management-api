const mongoose = require('mongoose');
const {Config} = require("../../configs/bootstrap")
const {MONGODB} = Config;

const groupSchema = mongoose.Schema({
    adminId: {type:mongoose.Schema.Types.ObjectId, ref: MONGODB.USER, required: true},
    topic: {type: String,required: true,unique: true},
    totalPoint:{ type:Number, required: false,default:20},
    totalPointAssignable:{ type:Number, required: false,default:0},
    totalNumberOfTicket:{ type:Number, required: false,default:1},
    totalNumberOfTicketCreated:{ type:Number, required: false,default:0},
    status: {type: Boolean,required: true,default: false},
    createdAt: {type: Date,required: true, default: Date.now},
    modifiedAt: {type: Date,required: false}
});

module.exports = mongoose.model(MONGODB.GROUP, groupSchema);