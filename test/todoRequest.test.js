const request = require("supertest");
// const { MongoMemoryServer } = require("mongodb-memory-server");
const {httpPostRequest} = require("./httpHandler");
const mongoose = require("mongoose");

describe("Testing TODO Endpoint", () => {
//   beforeAll(async () => {
//     const mongoServer = await MongoMemoryServer.create();
//     await mongoose.connect(mongoServer.getUri());
//   });

//   afterAll(async () => {
//     await mongoose.disconnect();
//     await mongoose.connection.close();
//   });

  describe("TODO Test", ()=>{
    const requestBody = {
        username: "bolola1020@gmail.com",
        password: "1234567",
        gender: "Female"
    };
    it("Create TODO,should return a 201",async ()=>{
        const { status, body } = await httpPostRequest("/api/todo/create",requestBody);
        expect(status).toBe(201);
        expect(body).toEqual(requestBody);
    })

  })
});
