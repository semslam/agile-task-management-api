const path = require("path");
require('dotenv').config({path: path.resolve(__dirname, `../env/.${process.env.NODE_ENV}.env`)});

function clean(value) {
    const FALSY_VALUES = ['', 'null', 'false', 'undefined'];
    if (!value || FALSY_VALUES.includes(value)) {
      return undefined;
    }
    return true;
  }
  
  const env = {
    isProduction: process.env.NODE_ENV === 'prod',
    isStaging: process.env.NODE_ENV === 'stg',
    isTest: process.env.NODE_ENV === 'test',
    isDev: process.env.NODE_ENV === 'dev'
  };

const {HOST,API_BASE,PORT,ACCESS_TOKEN_SECRET,SET_EXPIRE,EV,DATABASE_CONFIG,MONGODB_OPTION,USER_COLLECTION,TODO_COLLECTION,GROUP_COLLECTION,CHAT_COLLECTION,MESSAGE_COLLECTION } = process.env;

if(!clean(Object.values(env).includes(true))){
    console.log('App can not start, Missing NODE_ENV configurations file!!!!')
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
        GROUP:GROUP_COLLECTION,
        CHAT: CHAT_COLLECTION,
        MESSAGE:MESSAGE_COLLECTION
    }
})

module.exports = {Config}