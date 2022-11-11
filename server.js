const {HOST,PORT,ENVIRONMENT,app,server} = require("./configs/app");
server.listen(PORT, () =>
    console.log(`Server is running on ENV ${ENVIRONMENT} at ${HOST}:${PORT || 3000}!`),
);
