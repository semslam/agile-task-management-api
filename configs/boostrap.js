require("dotenv/config");
const config = Object.freeze({
    ORIGIN:`${process.env.HOST}:${process.env.PORT}`,
    HOST:process.env.HOST,
    PORT:process.env.PORT,
    ACCESS_TOKEN:process.env.ACCESS_TOKEN_SECRET,
    MONGODB:{
        DB_URL:process.env.DATABASE_CONFIG,
        OPTION:JSON.parse(process.env.MONGODB_OPTION),
        USER:process.env.USER_COLLECTION,
        TODO:process.env.TODO_COLLECTION,
    }
})