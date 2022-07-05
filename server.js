const {HOST,PORT,ENVIRONMENT,app} = require("./configs/app");
app.listen(PORT, () =>
    console.log(`Server is running on ENV ${ENVIRONMENT} at ${HOST}:${PORT || 3000}!`),
);
