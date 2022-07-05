const express = require("express");
const cors = require("cors");
require("dotenv/config");

const app = express();

const corsOptions = {
  origin: `${process.env.HOST}:${process.env.PORT}`
};

app.use(cors(corsOptions));



// parse requests of content-type - application/json
app.use(express.json());  /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));   /* bodyParser.urlencoded() is deprecated */
// simple route
app.get("/", (req, res) => {
    res.status(200).send({ message: "Welcome to todo list API" })
});


app.all('*', (req, res) => {
 res.status(404).send({ message: "Not Found" })
});
// set port, listen for requests
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
