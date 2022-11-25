const mongoose = require('mongoose');
const {Gender} = require("../../libraries/enums")
const {Config} = require("../../configs/bootstrap");
const {MONGODB} = Config;
const userSchema = mongoose.Schema({
    name: {type: String,required: true},
    username: {type: String,required: true,unique: true,immutable: true},
    gender:{ type:String, required: false,enum:[Gender.MALE,Gender.FEMALE]},
    image: {type: String,required: false},
    password: {type: String,required: true},
    isActive: {type: Boolean,required: true, default: false},
    createdAt: {type: Date,required: true, default: Date.now},
    modifiedAt: {type: Date,required: false}
});

module.exports = mongoose.model(MONGODB.USER, userSchema);