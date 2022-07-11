module.exports = class Todo{
    constructor(todo){
        this.id = todo._id
        this.userId  = todo.userId
        this.summary = todo.summary
        this.description = todo.description
        this.stage = todo.stage
        this.cardColor = todo.cardColor
        this.createdAt = todo.createdAt
    }
}