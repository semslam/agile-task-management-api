const path = require("path");
const {isObjectContainUndefine} = require("../libraries/utilities");
require('dotenv').config({path: path.resolve(__dirname, `../env/.${process.env.NODE_ENV}.env`)});

const {HOST,API_BASE,PORT,ACCESS_TOKEN_SECRET,SET_EXPIRE,EV,DATABASE_CONFIG,MONGODB_OPTION,USER_COLLECTION,TODO_COLLECTION} = process.env;

if(!isObjectContainUndefine({HOST,API_BASE,PORT,ACCESS_TOKEN_SECRET,SET_EXPIRE,EV,DATABASE_CONFIG,MONGODB_OPTION,USER_COLLECTION,TODO_COLLECTION})){
    console.log('Missing NODE_ENV configurations file!!!!')
    process.exit(1);
}

//  console.log(process.env.NODE_ENV)

const Config = Object.freeze({
    ORIGIN:`${HOST}:${PORT}`,
    HOST:HOST,
    API_BASE:API_BASE,
    PORT:PORT,
    ACCESS_TOKEN:ACCESS_TOKEN_SECRET,
    SET_EXPIRE:SET_EXPIRE,
    ENV:EV,
    MONGODB:{
        DB_URL:DATABASE_CONFIG,
        OPTION:JSON.parse(MONGODB_OPTION),
        USER:USER_COLLECTION,
        TODO:TODO_COLLECTION,
    }
})

module.exports = {Config}