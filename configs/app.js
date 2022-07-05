const express = require("express");
const cors = require("cors");
const {Config} = require("./bootstrap");
const connectDB = require("./mongodb")


class App {
 
  constructor() {
    const {HOST,PORT,ORIGIN,ENV} = Config;
    this.PORT = PORT;
    this.HOST = HOST;
    this.ORIGIN = ORIGIN;
    this.ENVIRONMENT = ENV;
    connectDB();
    this.app = express();
    this.config();   
  }

 config() {
    const corsOptions = {
        origin:this.ORIGIN
      };
    this.app.use(cors(corsOptions));

    // parse requests of content-type - application/json
    this.app.use(express.json());  /* bodyParser.json() is deprecated */
    // parse requests of content-type - application/x-www-form-urlencoded
    this.app.use(express.urlencoded({ extended: true }));   /* bodyParser.urlencoded() is deprecated */

    this.app.get("/", (req, res) => {
        res.status(200).send({ message: "Welcome to todo list API" })
    });
    
    require("../api/routes")(this.app);
    
    this.app.all('*', (req, res) => {
     res.status(404).send({ message: "Not Found" })
    });

  }
}

module.exports = new App();
