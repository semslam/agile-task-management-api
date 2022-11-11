
module.exports = class Messages{
    constructor(messages){
    this.id = messages._id
    this.sender = messages.sender // users object
    this.content = messages.content
    this.chat = messages.chat // chat object
    this.readBy = [] // array users object
    this.createdAt = messages.createdAt
    }
}

// {
//     sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//     content: { type: String, trim: true },
//     chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
//     readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
//   },