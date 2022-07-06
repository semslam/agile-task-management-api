const mongoose = require('mongoose');
const {MONGODB} = require("../../configs/bootstrap");

const userSchema = mongoose.Schema({
    name: {type: String,required: true},
    username: {type: String,required: true},
    password: {type: String,required: true},
    isActive: {type: Boolean,required: true, default: false},
    createdAt: {type: Date,required: true, default: Date.now},
    modifiedAt: {type: Date,required: false}
});

module.exports = mongoose.model(MONGODB.USER, userSchema);