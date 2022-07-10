const testServer = require("./testServer");
const request = require("supertest");
const app = testServer();

 async function httpPostRequest(urlPath,requestBody) {
    return await request(app)
            .post(urlPath)
            .send(requestBody)
            .set('Accept', 'application/json'); 
  }

  async function httpPostRequestWithHerderAuth(urlPath,token,requestBody) {
    return await request(app)
            .post(urlPath)
            .send(requestBody)
            .set("Authorization", `Bearer ${token}`)
            .set('Accept', 'application/json'); 
  }

  async function httpPutRequest(urlPath,requestBody) {
    return await request(app)
            .put(urlPath)
            .send(requestBody)
            .set('Accept', 'application/json'); 
  }
  async function httpPutRequestWithHerderAuth(urlPath,token,requestBody) {
    return await request(app)
            .put(urlPath)
            .send(requestBody)
            .set("Authorization", `Bearer ${token}`)
            .set('Accept', 'application/json'); 
  }
  
  async function httpGetRequest(urlPath) {
    return await request(app)
            .get(urlPath)
  }
  async function httpGetRequestWithHerderAuth(urlPath,token) {
    return await request(app)
            .get(urlPath)
            .set("Authorization", `Bearer ${token}`)
  }

  async function httpDeleteRequest(urlPath) {
    return await request(app)
            .delete(urlPath)
  }

  async function httpDeleteRequestWithHerderAuth(urlPath,token) {
    return await request(app)
            .delete(urlPath)
            .set("Authorization", `Bearer ${token}`)
  }
  

  module.exports = {
    httpPostRequest,
    httpGetRequest,
    httpDeleteRequest,
    httpPostRequestWithHerderAuth,
    httpPutRequest,
    httpPutRequestWithHerderAuth,
    httpGetRequestWithHerderAuth,
    httpDeleteRequestWithHerderAuth
    
  }