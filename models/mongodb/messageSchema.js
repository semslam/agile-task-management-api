const mongoose = require('mongoose');
const {Config} = require("../../configs/bootstrap")

const {MONGODB} = Config;
const messageSchema = mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: MONGODB.USER},
    content: { type: String, trim: true},
    chat: { type: mongoose.Schema.Types.ObjectId, ref: MONGODB.CHAT},
    readBy: { type: mongoose.Schema.Types.ObjectId, ref: MONGODB.USER},
    createdAt: {type: Date,required: true, default: Date.now}
});

module.exports = mongoose.model(MONGODB.MESSAGE, messageSchema);