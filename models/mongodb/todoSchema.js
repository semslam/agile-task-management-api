const mongoose = require('mongoose');
const {Config} = require("../../configs/bootstrap")
// console.log(MONGODB)
const {MONGODB} = Config;
const todoSchema = mongoose.Schema({
    userId: {type: String,required: true},
    summary: {type: String,required: true},
    description: {type: String,required: true},
    stage: {type: String,required: true, enum:["pending","inProgress","review","complete"],default: "pending"},
    cardColor: {type: String,required: true, default: '#cddc39'},
    isCompleted: {type: Boolean,required: true,default: false},
    createdAt: {type: Date,required: true, default: Date.now},
    modifiedAt: {type: Date,required: false},
    completedAt: { type: Date,required: false}
});

module.exports = mongoose.model(MONGODB.TODO, todoSchema);