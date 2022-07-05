const testServer = require("./testServer");
const request = require("supertest");
const app = testServer();

async function httpPostRequest(urlPath,requestBody) {
    return await request(app)
            .post(urlPath)
            .send(requestBody)
            .set('Accept', 'application/json'); 
  }
  
  async function httpGetRequest(urlPath) {
    return await request(app)
            .get(urlPath)
  }

  async function httpDeleteRequest(urlPath) {
    return await request(app)
            .get(urlPath)
  }
  
  async function httpPostRequestWithHerderAuth(urlPath,token,requestBody) {
    return await request(app)
            .post(urlPath)
            .send(requestBody)
            .set("Authorization", `Bearer ${token}`)
            .set('Accept', 'application/json'); 
  }

  module.exports = {
    httpPostRequest,
    httpGetRequest,
    httpDeleteRequest,
    httpPostRequestWithHerderAuth
  }