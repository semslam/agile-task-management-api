const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const {
    httpPostRequest,
    httpPostRequestWithHerderAuth,
    httpPutRequestWithHerderAuth,
    httpGetRequestWithHerderAuth,
    httpDeleteRequestWithHerderAuth
} = require("./httpHandler");
const {Config} = require("../configs/bootstrap");

const mongoose = require("mongoose");

describe("Testing TODO Endpoint", () => {
    jest.setTimeout(5000)
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  let todoId = "";
  const wrongTodoId= "62c6a097003efdfa40f0b5f8";
  let userAccessToken = "";
  const user1RequestPayload = {
    name:"Ibrahim Olanrewaju",
    username:"semslam007@gmail.com",
    password:"password123"
};
const loginRequestPayload = {
    username:"semslam007@gmail.com",
    password:"password123"
};

it("POST, Create USER, Should return a 201",async ()=>{
    const { status, body } = await httpPostRequest("/users/create",user1RequestPayload);
    expect(status).toBe(201);
})

it("POST, User Login , Should return a 200",async ()=>{
    const { status, body } = await httpPostRequest("/users/login",loginRequestPayload);
    expect(status).toBe(200);
    userAccessToken = body.data.userAccessToken
})

  describe("TODO Creation Testing....", ()=>{
      const PATH = Config.API_BASE;
      jest.setTimeout(5000)
    const requestPayload = {
        summary: "Create Server",
        description: "Setup server on AWS EC2",
        cardColor:"#cddc39"
    };
    const wrongRequestPayload = {
        summary: "Create Server",
        description: "Setup server on AWS EC2",
        cardColor:"#fffff"
    };

    it("POST, Create TODO, Should return a 201",async ()=>{
        const { status, body } = await httpPostRequestWithHerderAuth("/todo/create",userAccessToken,requestPayload);
        expect(status).toBe(201);
        const { code, message, status: statusMessage, data } = body;
        expect(statusMessage).toEqual("Successful")
        expect(message).toEqual('Todo was successful created!!');
        expect(code).toBe(201);
        todoId = data.id
        console.log(todoId)
    })

    it("POST, Create TODO with existing record, Should return a 422",async ()=>{
        const { status, body } = await httpPostRequestWithHerderAuth("/todo/create",userAccessToken,requestPayload);
        expect(status).toBe(422);
        const { code, message, status: statusMessage } = body;
        expect(statusMessage).toEqual("Failed")
        expect(message).toEqual("The todo record already exist!");
        expect(code).toBe(422);
    })

    it("POST, Create TODO with wrong payload, Should return a 422",async ()=>{
        const { status, body } = await httpPostRequestWithHerderAuth("/todo/create",userAccessToken,wrongRequestPayload);
        expect(status).toBe(422);
        const { code, message, status: statusMessage } = body;
        expect(statusMessage).toEqual("Failed")
        // expect(message).toEqual("The todo record already exist!");
        expect(code).toBe(422);
    })

    it("POST, Create TODO without herder authorization, Should return a 401",async ()=>{
        const { status, body } = await httpPostRequestWithHerderAuth("/todo/create","",requestPayload);
        expect(status).toBe(401);
        const { code, message, status: statusMessage } = body;
        expect(statusMessage).toEqual("Failed")
        expect(message).toEqual("Missing Signature Header");
        expect(code).toBe(401);
    })

    it("POST, Create TODO with empty payload, Should return a 422",async ()=>{
        const { status, body } = await httpPostRequestWithHerderAuth("/todo/create",userAccessToken,{});
        expect(status).toBe(422);
        const { code, message, status: statusMessage } = body;
        expect(statusMessage).toEqual("Failed")
        expect(code).toBe(422);
    })

  })

  describe("TODO Update Testing....", ()=>{
    jest.setTimeout(5000)
    const requestPayload = {
        summary: "Create Server",
        description: "Setup server on AWS EC2",
        cardColor:"#cddc39"
    };
    const wrongRequestPayload = {
        summary: "Create Server",
        description: "Setup server on AWS EC2",
        cardColor:"#fffff"
    };

    
    console.log("UPDATE TODO LIST")
    console.log(todoId)
    it("PUT, Update TODO, Should return a 200",async ()=>{
        
        const { status, body } = await httpPutRequestWithHerderAuth(`/todo/update/${todoId}`,userAccessToken,requestPayload);
        expect(status).toBe(200);
        const {code, message, status: statusMessage, data} = body;
        expect(statusMessage).toEqual("Successful")
        expect(message).toEqual('Todo was successful updated!!')
        expect(data.summary).toEqual('Create Server')
        expect(data.description).toEqual('Setup server on AWS EC2')
        expect(data.cardColor).toEqual('#cddc39')
        expect(code).toBe(200);
    })

    it("PUT, Update TODO with wrong payload, Should return a 422",async ()=>{
        const { status, body } = await httpPutRequestWithHerderAuth(`/todo/update/${todoId}`,userAccessToken,wrongRequestPayload);
        expect(status).toBe(422);
        const {code, status: statusMessage} = body;
        expect(statusMessage).toEqual("Failed")
        expect(code).toBe(422);
    })

    it("PUT, Update TODO with without herder authorization, Should return a 401",async ()=>{
        const { status, body } = await httpPutRequestWithHerderAuth(`/todo/update/${todoId}`,"",requestPayload);
        expect(status).toBe(401);
        const {code,message, status: statusMessage} = body;
        expect(statusMessage).toEqual("Failed")
        expect(message).toEqual('Missing Signature Header')
        expect(code).toBe(401);
    })

    it("PUT, Update TODO with empty payload, Should return a 422",async ()=>{
        const { status, body } = await httpPutRequestWithHerderAuth(`/todo/update/${todoId}`,userAccessToken,{});
        expect(status).toBe(422);
        const {code,message, status: statusMessage} = body;
        expect(statusMessage).toEqual("Failed")
        expect(message).toEqual("\"summary\" is required")
        expect(code).toBe(422);
    })

    it("PUT, Update TODO with wrong todo id, Should return a 400",async ()=>{
        const { status, body } = await httpPutRequestWithHerderAuth(`/todo/update/${wrongTodoId}`,userAccessToken,requestPayload);
        expect(status).toBe(400);
        const {code,message, status: statusMessage} = body;
        expect(statusMessage).toEqual("Failed")
        expect(message).toEqual("TODO record doesn't exist and it can't be update!")
        expect(code).toBe(400);
    })

    it("PUT, Update TODO with numeric id, Should return a 400",async ()=>{
        const { status, body } = await httpPutRequestWithHerderAuth(`/todo/update/${45}`,userAccessToken,requestPayload);
        expect(status).toBe(400);
        const {code,message, status: statusMessage} = body;
        expect(statusMessage).toEqual("Failed")
        expect(message).toEqual("The todo id must not be empty or a number!")
        expect(code).toBe(400);
    })

  })

  describe("TODO Fetch Testing....", ()=>{
    jest.setTimeout(5000)
    
    it("GET, Fetch single TODO List, Should return a 200",async ()=>{
        const { status, body } = await httpGetRequestWithHerderAuth(`/todo/get/${todoId}`,userAccessToken);
        expect(status).toBe(200);
        const {code,message, status: statusMessage,data} = body;
        expect(data).not.toBe(null);
        expect(statusMessage).toEqual("Successful")
        expect(message).toEqual("Todo was fetched successfully!!")
        expect(code).toBe(200);
    })

    it("GET, Fetch single TODO with wrong id, Should return a 400",async ()=>{
        const { status, body } = await httpGetRequestWithHerderAuth(`/todo/get/${wrongTodoId}`,userAccessToken);
        expect(status).toBe(400);
        const {code,message, status: statusMessage} = body;
        expect(statusMessage).toEqual("Failed")
        expect(message).toEqual("TODO record doesn't exist!")
        expect(code).toBe(400);
    })

    it("GET, Fetch single TODO with without herder authorization, Should return a 401",async ()=>{
        const { status, body } = await httpGetRequestWithHerderAuth(`/todo/get/${todoId}`,"");
        expect(status).toBe(401);
        const {code,message, status: statusMessage} = body;
        expect(statusMessage).toEqual("Failed")
        expect(message).toEqual("Missing Signature Header")
        expect(code).toBe(401);
    })

    it("GET, Fetch single TODO with numeric id, Should return a 400",async ()=>{
        const { status, body } = await httpGetRequestWithHerderAuth(`/todo/get/${45}`,userAccessToken);
        expect(status).toBe(400);
        const {code,message, status: statusMessage} = body;
        expect(statusMessage).toEqual("Failed")
        expect(message).toEqual("The todo id must not be empty or a number!")
        expect(code).toBe(400);
    })

  })

  describe("TODO  Fetch All Testing....", ()=>{
    jest.setTimeout(5000)
   
    it("GET, Fetch all TODO, Should return a 200",async ()=>{
        const { status, body } = await httpGetRequestWithHerderAuth(`/todo/get-all/`,userAccessToken);
        expect(status).toBe(200);
        const {code,message, status: statusMessage, data} = body;
        expect(data.length).toBe(1);
        expect(statusMessage).toEqual("Successful")
        expect(message).toEqual("Todo was fetched successfully!!")
        expect(code).toBe(200);
        
    })

    it("GET, Fetch all TODO with without herder authorization,should return a 401",async ()=>{
        const { status, body } = await httpGetRequestWithHerderAuth(`/todo/get-all/`,"");
        expect(status).toBe(401);
        const {code,message, status: statusMessage} = body;
        expect(statusMessage).toEqual("Failed")
        expect(message).toEqual("Missing Signature Header")
        expect(code).toBe(401);
    })

  })

  describe("TODO Delete Testing....", ()=>{
    jest.setTimeout(5000)
   
    it("DELETE, Delete single TODO with id, Should return a 200",async ()=>{
        const { status, body } = await httpDeleteRequestWithHerderAuth(`/todo/delete/${todoId}`,userAccessToken);
        expect(status).toBe(200);
        const {code,message, status: statusMessage} = body;
        expect(statusMessage).toEqual("Successful")
        expect(message).toEqual("Todo was deleted successfully!!")
        expect(code).toBe(200);
    })


    it("GET, Fetch single TODO after delete, Should return a 400",async ()=>{
        const { status, body } = await httpGetRequestWithHerderAuth(`/todo/get/${todoId}`,userAccessToken);
        expect(status).toBe(400);
        const {code,message, status: statusMessage} = body;
        expect(statusMessage).toEqual("Failed")
        expect(message).toEqual("TODO record doesn't exist!")
        expect(code).toBe(400);
    })


    it("DELETE, Delete single TODO with wrong id, Should return a 400",async ()=>{
        const { status, body } = await httpDeleteRequestWithHerderAuth(`/todo/delete/${wrongTodoId}`,userAccessToken);
        expect(status).toBe(400);
        const {code,message, status: statusMessage} = body;
        expect(statusMessage).toEqual("Failed")
        expect(message).toEqual("TODO does not delete!")
        expect(code).toBe(400);
    })

    it("DELETE, Delete single TODO with without herder authorization, Should return a 401",async ()=>{
        const { status, body } = await httpDeleteRequestWithHerderAuth(`/todo/delete/${todoId}`,"");
        expect(status).toBe(401);
        const {code,message, status: statusMessage} = body;
        expect(statusMessage).toEqual("Failed")
        expect(message).toEqual("Missing Signature Header")
        expect(code).toBe(401);
    })

    it("DELETE, Delete single TODO with numeric id, Should return a 400",async ()=>{
        const { status, body } = await httpDeleteRequestWithHerderAuth(`/todo/delete/${45}`,userAccessToken);
        expect(status).toBe(400);
        const {code,message, status: statusMessage} = body;
        expect(statusMessage).toEqual("Failed")
        expect(message).toEqual("The todo id must not be empty or a number!")
        expect(code).toBe(400);
    })

  })
});