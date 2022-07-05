const mongoose = require("mongoose");
const {Config} = require("./bootstrap");

const connectDB = async () => {
    try {
        const {MONGODB} = Config
        await mongoose.connect(MONGODB.DB_URL,MONGODB.OPTION);
    } catch (err) {
        throw new Error(err.message);
    }
}

mongoose.connection.on('connecting', () => console.info('database connecting....'));
mongoose.connection.on('connected', () => console.info('database connected'));
mongoose.connection.on('disconnecting', () => console.info('database disconnecting....'));
mongoose.connection.on('disconnected', () => console.info('database disconnected'));
mongoose.connection.on('error', () => console.error('database error'));

module.exports = connectDB