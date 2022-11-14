
module.exports = class Message{
    constructor(message){
    this.id = message._id
    this.sender = message.sender // users object
    this.content = message.content
    this.chat = message.chat // chat object
    this.readBy = message.readBy // users object
    this.createdAt = message.createdAt
    }
}
