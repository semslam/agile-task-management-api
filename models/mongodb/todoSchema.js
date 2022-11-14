const mongoose = require('mongoose');
const {Config} = require("../../configs/bootstrap")
const {Stages, Priorities} =  require("../../libraries/enums")

const {MONGODB} = Config;
const {PENDING,PROGRESS,REVIEW,COMPLETE} = Stages;
const {IMPORTANT_NOT_URGENT,URGENT_AND_IMPORTANT,NOT_URGENT_NOT_IMPORTANT,URGENT_NOT_IMPORTANT} = Priorities;
const todoSchema = mongoose.Schema({
    groupId:{type:mongoose.Schema.Types.ObjectId, ref: MONGODB.GROUP, required: true},
    ticketNumber:{ type:String, required: true},
    summary: {type: String,required: true,unique: true},
    description: {type: String,required: true},
    priorities: {type: String,required: true, enum:[IMPORTANT_NOT_URGENT,URGENT_AND_IMPORTANT,NOT_URGENT_NOT_IMPORTANT,URGENT_NOT_IMPORTANT],default: NOT_URGENT_NOT_IMPORTANT},
    stage: {type: String,required: true, enum:[PENDING,PROGRESS,REVIEW,COMPLETE],default: PENDING},
    cardColor: {type: String,required: true, default: '#cddc39'},
    point:{ type:Number, required: false,default:1},
    isCompleted: {type: Boolean,required: true,default: false},
    completedAt: { type: Date,required: false},
    startDate: {type: Date,required: false},
    dueDate: {type: Date,required: false},
    createdAt: {type: Date,required: true, default: Date.now},
    modifiedAt: {type: Date,required: false}
});

module.exports = mongoose.model(MONGODB.TODO, todoSchema);