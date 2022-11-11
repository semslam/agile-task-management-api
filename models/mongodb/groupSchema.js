const mongoose = require('mongoose');
const {Config} = require("../../configs/bootstrap")
const {Priorities} =  require("../../libraries/enums")

const {MONGODB} = Config;
const {IMPORTANT_NOT_URGENT,URGENT_AND_IMPORTANT,NOT_URGENT_NOT_IMPORTANT,URGENT_NOT_IMPORTANT} = Priorities
const groupSchema = mongoose.Schema({
    adminId: {type:Schema.Types.ObjectId, ref: MONGODB.USER, required: true},
    topic: {type: String,required: true,unique: true},
    priorities: {type: String,required: true, enum:[IMPORTANT_NOT_URGENT,URGENT_AND_IMPORTANT,NOT_URGENT_NOT_IMPORTANT,URGENT_NOT_IMPORTANT],default: NOT_URGENT_NOT_IMPORTANT},
    totalPoint:{ type:Number, required: false,default:20},
    totalNumberOfTicket:{ type:Number, required: false,default:2},
    status: {type: Boolean,required: true,default: false},
    startDate: {type: Date,required: false},
    dueDate: {type: Date,required: false},
    completedAt: { type: Date,required: false},
    createdAt: {type: Date,required: true, default: Date.now},
    modifiedAt: {type: Date,required: false}
});

module.exports = mongoose.model(MONGODB.GROUP, groupSchema);