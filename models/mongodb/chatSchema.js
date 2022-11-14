const mongoose = require('mongoose');
const {Config} = require("../../configs/bootstrap")

const {MONGODB} = Config;
const chatSchema = mongoose.Schema({
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: MONGODB.USER}],
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: MONGODB.TODO},
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    latestMessage: { type: mongoose.Schema.Types.ObjectId,ref: MONGODB.MESSAGE},
    groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: MONGODB.USER},
    createdAt: {type: Date,required: true, default: Date.now},
    modifiedAt: {type: Date,required: false}
});

module.exports = mongoose.model(MONGODB.CHAT, chatSchema);