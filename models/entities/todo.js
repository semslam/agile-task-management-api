module.exports = class Todo{
    constructor(todo){
        this.id = todo._id
        this.groupId  = todo.groupId
        // this.contentType = todo.contentType
        this.priorities = group.priorities
        this.summary = todo.summary
        this.description = todo.description
        this.stage = todo.stage
        this.cardColor = todo.cardColor
        this.point = group.point
        this.isCompleted = todo.isCompleted;
        this.createdAt = todo.createdAt;
        this.modifiedAt = todo?.modifiedAt;
    }
}