const {create} = require("../repositories/todoRepository");
const todoSchema = require("../models/mongodb/todoSchema")

// const datRepo = DataRepository(todoSchema);

const insert = async (todo)=>{
    await create(todo);
    return true

}

module.exports = {insert}
