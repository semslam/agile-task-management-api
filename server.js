const {HOST,PORT,ENVIRONMENT,app,server} = require("./configs/app");
const WebSockets = require("./libraries/webSockets");
server.listen(PORT, () =>
    console.log(`Server is running on ENV ${ENVIRONMENT} at ${HOST}:${PORT || 3000}!`),
);


/** Create socket connection */
    // const io = socketio.listen(this.server);
    server.on('connection', WebSockets.connection)
    /** Listen on provided port, on all network interfaces. */