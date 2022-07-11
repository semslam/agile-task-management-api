const Todo = require("./todo")

module.exports = class TodoExtra extends Todo{
    constructor(todo){
        super(todo)
        this.isCompleted = todo.isCompleted;
        this.modifiedAt = todo?.modifiedAt;
    }
}