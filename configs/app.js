const express = require("express");
const cors = require("cors");
const {Config} = require("./bootstrap");
const http = require("http")
const multer = require('multer');
const connectDB = require("./mongodb");
const {successResponse, errorResponse} = require("../response/responseHandler");
const {HttpCodes, ErrorCodes} = require("../libraries/enums");
const socketio = require("socket.io");




class App {
   
  constructor() {
    this.PORT = Config.PORT;
    this.HOST = Config.HOST;
    this.ORIGIN = Config.ORIGIN;
    this.ENVIRONMENT = Config.ENV;
    connectDB();
    this.app = express();
     /** Create HTTP server. */
    this.server = http.createServer(this.app);
    this.config();   
  }

 config() {

   const upload = multer({
      limits: {
        fileSize: 4 * 1024 * 1024,
      },
      abortOnLimit: true,
    });
    
    const corsOptions = {
        origin: `http://localhost:3000`
      };
    this.app.use(cors(corsOptions));
    this.app.use(upload.single('image'))

    // parse requests of content-type - application/json
    this.app.use(express.json());  /* bodyParser.json() is deprecated */
    // parse requests of content-type - application/x-www-form-urlencoded
    this.app.use(express.urlencoded({ extended: true}));   /* bodyParser.urlencoded() is deprecated */
    
    this.app.get("/", (req, res) => {
        successResponse(req, res,HttpCodes.OK,{
            name: "TODO LIST API",
            version: "1.0",
            description: "RESTful API Designed in Node.js for TODO application.",
            methodsAllowed: "GET, POST, PUT, PATCH, DELETE",
            authType: "Bearer token",
            rootEndPoint:`${req.protocol}://${req.get('host')}/api/v1`,
            documentation: "https://github.com/semslam/todo-list-api"
          });
    });
    const PATH = Config.API_BASE;
    this.app.use(PATH,require("../api/routes")())
    this.app.all("*",async (req, res) => {
     errorResponse(req, res,ErrorCodes.NOT_FOUND,"Not Found")
    });  
   
  }
}

module.exports = new App();
