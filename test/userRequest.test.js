const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const {httpPostRequest} = require("./httpHandler");
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

  describe("TODO Test", ()=>{
    const requestBody = {
        summary: "bolola1020@gmail.com",
        description: "1234567",
        cardColor:"#fffff"
    };
    it("Create TODO,should return a 201",async ()=>{
        const { status, body } = await httpPostRequest("/api/todo/create",requestBody);
        expect(status).toBe(201);
        expect(body).toEqual(requestBody);
    })

  })
});
