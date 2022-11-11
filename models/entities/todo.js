const GroupChat = require("./chat")
const GroupUser = require("./groupUser")
module.exports = class Todo{
    constructor(todo){
        // let groupUser[] = new GroupUser();
        this.id = todo._id
        this.groupId  = todo.groupId
        this.contentType = todo.contentType
        this.summary = todo.summary
        this.description = todo.description
        this.stage = todo.stage
        this.cardColor = todo.cardColor
        this.isCompleted = todo.isCompleted;
        this.createdAt = todo.createdAt;
        this.modifiedAt = todo?.modifiedAt;
    }
}