const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const {httpPostRequest,httpPutRequestWithHerderAuth,httpGetRequestWithHerderAuth} = require("./httpHandler");
const mongoose = require("mongoose");

describe("Testing TODO Endpoint", () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });
  
    const requestPayload = {
        name:"Ibrahim Olanrewaju",
        username:"olanrewajui2020@gmail.com",
        password:"password123"
    };
    const wrongRequestPayload = {
        name:"Ibrahim Olanrewaju",
        username:"olanrewajui2020",
        password:"password123"
    };
    const loginRequestPayload = {
        username:"olanrewajui2020@gmail.com",
        password:"password123"
    };
    const wrongLoginRequestPayload = {
        username:"olanrewajui2020@",
        password:"password123"
    };
    let userAccessToken = "";
  describe("USER Creation Testing....", ()=>{
    
    it("POST, Create USER, Should return a 201",async ()=>{
        const { status, body } = await httpPostRequest("/users/create",requestPayload);
        expect(status).toBe(201);
        const { code, message, status: statusMessage, data } = body;
        expect(data).not.toBe(null);
        expect(data.username).toEqual("olanrewajui2020@gmail.com");
        expect(statusMessage).toEqual("Successful")
        expect(message).toEqual('User was successful created!!');
        expect(code).toBe(201);
    })
    

    it("POST, Create USER with existing record, Should return a 422",async ()=>{
        const { status, body } = await httpPostRequest("/users/create",requestPayload);
        expect(status).toBe(422);
        const { code, message, status: statusMessage, data } = body;
        expect(data).not.toBe(null);
        expect(statusMessage).toEqual("Failed")
        expect(message).toEqual('The user already exist!');
        expect(code).toBe(422);
    })

    it("POST, Create USER with wrong payload, Should return a 422",async ()=>{
        const { status, body } = await httpPostRequest("/users/create",wrongRequestPayload);
        expect(status).toBe(422);
        const { code, message, status: statusMessage, data } = body;
        expect(data).not.toBe(null);
        expect(statusMessage).toEqual("Failed")
        expect(message).toEqual("\"username\" must be a valid email");
        expect(code).toBe(422);
    })

    it("POST,Create USER without payload, Should return a 422",async ()=>{
        const { status, body } = await httpPostRequest("/users/create",{});
        expect(status).toBe(422);
        const { code, message, status: statusMessage, data } = body;
        expect(data).not.toBe(null);
        expect(statusMessage).toEqual("Failed")
        expect(message).toEqual("\"name\" is required");
        expect(code).toBe(422);
    })

  })

  describe("USER Login Testing....", ()=>{
    
    it("POST, USER login ,should return a 200",async ()=>{
        const { status, body } = await httpPostRequest(`/users/login/`,loginRequestPayload);
        expect(status).toBe(200);
        const { code, message, status: statusMessage, data } = body;
        expect(data).not.toBe(null);
        expect(statusMessage).toEqual("Successful")
        expect(message).toEqual("User was successful login!");
        expect(code).toBe(200);
        userAccessToken = data.userAccessToken
    })

    it("POST, USER login with wrong credentials ,should return a 422",async ()=>{
        const { status, body } = await httpPostRequest(`/users/login/`,wrongLoginRequestPayload);
        expect(status).toBe(422);
        const { code, message, status: statusMessage, data } = body;
        expect(data).not.toBe(null);
        expect(statusMessage).toEqual("Failed")
        expect(message).toEqual("\"username\" must be a valid email");
        expect(code).toBe(422);
    })

  })

  describe("USER Update Testing....", ()=>{
    
    const payload = {
        name:"Ibrahim Olanrewaju"
    };
    it("PUT, Update the USER, Should return a 200",async ()=>{
        const { status, body } = await httpPutRequestWithHerderAuth(`/users/update/`,userAccessToken,payload);
        expect(status).toBe(200);
        const { code, message, status: statusMessage, data } = body;
        expect(data).not.toBe(null);
        expect(statusMessage).toEqual("Successful")
        expect(message).toEqual("User was successful updated!");
        expect(code).toBe(200);
    })

    it("POST, Update the USER without payload, Should return a 422",async ()=>{
        const { status, body } = await httpPutRequestWithHerderAuth(`/users/update/`,userAccessToken,{});
        expect(status).toBe(422);
        const { code, message, status: statusMessage, data } = body;
        expect(data).not.toBe(null);
        expect(statusMessage).toEqual("Failed")
        expect(message).toEqual("\"name\" is required");
        expect(code).toBe(422);
    })

    it("PUT, Update the USER with unrecognized URL path, Should return a 200",async ()=>{
        const { status } = await httpPutRequestWithHerderAuth(`/users/update/user`,userAccessToken,payload);
        expect(status).toBe(404);
    })

  })

  describe("USER Logout Testing....", ()=>{
    
    const payload = {
        name:"Ibrahim Olanrewaju"
    };
    it("GET, Logout the USER, Should return a 200",async ()=>{
        const { status, body } = await httpGetRequestWithHerderAuth(`/users/logout/`,userAccessToken);
        expect(status).toBe(200);
        const { code, message, status: statusMessage } = body;
        expect(statusMessage).toEqual("Successful")
        expect(message).toEqual("User was successful logout!");
        expect(code).toBe(200);
    })

    it("PUT, Update the USER after logging out, Should return a 401",async ()=>{
        const { status, body } = await httpPutRequestWithHerderAuth(`/users/update/`,userAccessToken,payload);
        expect(status).toBe(401);
        const { code, message, status: statusMessage, data } = body;
        expect(data).not.toBe(null);
        expect(statusMessage).toEqual("Failed")
        expect(message).toEqual("User is not Unauthorized, Please login!");
        expect(code).toBe(401);
    })

  })
});
