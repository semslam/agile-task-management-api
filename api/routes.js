const express = require("express");
const userRoute = require("./users/user.route");
const todoRoute = require("./todo/todo.route");

module.exports = (app) => {
  let router = express.Router();
   
    app.use('/api/todo',todoRoute(router));  
    app.use('/api/users',userRoute(router)); 
  };