const express = require("express");
const cors = require("cors");
const {Config} = require("./bootstrap");
const connectDB = require("./mongodb");
const {successResponse, errorResponse} = require("../response/responseHandler");
const {HttpCodes, ErrorCodes} = require("../libraries/enums");



class App {
   
  constructor() {
    this.PORT = Config.PORT;
    this.HOST = Config.HOST;
    this.ORIGIN = Config.ORIGIN;
    this.ENVIRONMENT = Config.ENV;
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
    this.app.use(express.urlencoded({ extended: true}));   /* bodyParser.urlencoded() is deprecated */
    
    this.app.get('/', (req, res) => {
        successResponse(res,HttpCodes.OK,"Welcome to todo list API");
    });
     
    require("../routes")(this.app);
    
    this.app.all('*', (req, res) => {
     errorResponse(res,ErrorCodes.NOT_FOUND,"Not Found")
    });

  }
}

module.exports = new App();
