module.exports = class Chat{
    constructor(chat){
    this.id = chat._id
    this.users = chat.users // array of users object
    this.groupId = chat.groupId // reference to group object
    this.chatName = chat.chatName
    this.isGroupChat = chat.isGroupChat
    this.latestMessage = chat.latestMessage // reference to message object
    this.groupAdmin = chat.groupAdmin // reference to user object
    this.createdAt = chat.createdAt
    this.modifiedAt = chat.modifiedAt
    }
}

