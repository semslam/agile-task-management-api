const mongoose = require('mongoose');
const {Config} = require("../../configs/bootstrap")
const {Stages} =  require("../../libraries/enums")

const {MONGODB} = Config;
const {PENDING,PROGRESS,REVIEW,COMPLETE} = Stages;
const todoSchema = mongoose.Schema({
    userId: {type: String,required: true},
    summary: {type: String,required: true},
    description: {type: String,required: true},
    stage: {type: String,required: true, enum:[PENDING,PROGRESS,REVIEW,COMPLETE],default: PENDING},
    cardColor: {type: String,required: true, default: '#cddc39'},
    isCompleted: {type: Boolean,required: true,default: false},
    createdAt: {type: Date,required: true, default: Date.now},
    modifiedAt: {type: Date,required: false},
    completedAt: { type: Date,required: false}
});

module.exports = mongoose.model(MONGODB.TODO, todoSchema);