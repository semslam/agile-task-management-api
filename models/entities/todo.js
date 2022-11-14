module.exports = class Todo{
    constructor(todo){
        this.id = todo._id
        this.groupId  = todo.groupId
        this.ticketNumber = todo.ticketNumber
        // this.contentType = todo.contentType
        this.priorities = todo.priorities;
        this.summary = todo.summary;
        this.description = todo.description;
        this.stage = todo.stage;
        this.cardColor = todo.cardColor;
        this.point = todo.point;
        this.isCompleted = todo.isCompleted;
        this.startDate = todo.startDate;
        this.dueDate = todo.startDate;
        this.createdAt = todo.createdAt;
        this.modifiedAt = todo?.modifiedAt;
    }
}