const path = require("path");
require('dotenv').config({path: path.resolve(__dirname, `../env/.${process.env.NODE_ENV}.env`)});
const {HOST,PORT,ACCESS_TOKEN_SECRET,EV,DATABASE_CONFIG,MONGODB_OPTION,USER_COLLECTION,TODO_COLLECTION} = process.env;

 console.log(process.env.NODE_ENV)

const Config = Object.freeze({
    ORIGIN:`${HOST}:${PORT}`,
    HOST:HOST,
    PORT:PORT,
    ACCESS_TOKEN:ACCESS_TOKEN_SECRET,
    ENV:EV,
    MONGODB:{
        DB_URL:DATABASE_CONFIG,
        OPTION:JSON.parse(MONGODB_OPTION),
        USER:USER_COLLECTION,
        TODO:TODO_COLLECTION,
    }
})

module.exports = {Config}