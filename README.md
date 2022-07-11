# Todo List API

A todo list API service is a task management application that allows you to more efficiently write, organize, and reprioritize your tasks. They also allow you to attach stages to a task and many allow you to see when the task is completed.

# Instructions
1. Open your terminal and navigate to the todo-list-api folder. Run those commands below before you start the API. 
```
$ npm install
```
2. Run this to start develoment mode:
```
$ npm run start:dev
```

4. Run this testing case, bolt installation and uint:
```
$ npm test -- todoRequest.test.js
$ npm test -- userRequest.test.js
$ npm test -- utilities.test.js
$ npm test -- passwordHashing.test.js
$ npm test -- jwtEncryptAndDecrypt.test.js
$ npm test -- dateFormat.test.js
```

# API Guides
1. A user must be aboard. The system offers an endpoint for a user to be onboarded (creating a new user account).

URL Path (POST)`api/v1/uses/create`

Payload Example:
```
{
  "name":"Ibrahim Olanrewaju",  
  "username": "olanrewajui2020@gmail.com",
  "password": "password123",
}
```
Response Example:
```
{
    "timestamp": 1657517301,
    "code": 201,
    "path": "/api/v1/users/create/",
    "method": "POST",
    "status": "Successful",
    "message": "User was successful created!!",
    "data": {
        "id": "62cbc24e4a985595be049691",
        "name": "Ibrahim Olanrewaju",
        "username": "olanrewajui2020@gmail.com",
        "isActive": false,
        "createdAt": "2022-07-11T05:28:21.356Z"
    }
}
```

2. The user must first login before adding a new todo task. After successfully logging in, the user receives an access token that may be used to connect with other authorized endpoints.

URL Path (POST) `api/v1/users/login`

Payload Example:
```
{
  "username": "olanrewajui2020@gmail.com",
  "password": "password123"
}
```
Response Example:
```
{
    "timestamp": 1657520758,
    "code": 200,
    "path": "/api/v1/users/login",
    "method": "POST",
    "status": "Successful",
    "message": "User was successful login!",
    "data": {
        "userAccessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyY2JjMjRlNGE5ODU1OTViZTA0OTY5MSIsInVzZXJuYW1lIjoib2xhbnJld2FqdWkyMDIwQGdtYWlsLmNvbSIsInVzZXIiOiJJYnIgU2VtaXUiLCJpYXQiOjE2NTc1MjA3NTgsImV4cCI6MTY4OTA1Njc1OH0.5m7mssN2FaAAIAq5OL0oWWOJQNkz6cwlLoxI4mQgUcw"
    }
}
```
The user must add a header signature to the authorize endpoint, and set authorization bearer with the user access token e.g. 
Authorization : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyY2JjMjRlNGE5ODU1OTViZTA0OTY5MSIsInVzZXJuYW1lIjoib2xhbnJld2FqdWkyMDIwQGdtYWlsLmNvbSIsInVzZXIiOiJJYnIgU2VtaXUiLCJpYXQiOjE2NTc1MjA3NTgsImV4cCI6MTY4OTA1Njc1OH0.5m7mssN2FaAAIAq5OL0oWWOJQNkz6cwlLoxI4mQgUcw`

3. The Update user endpoint allows the user to update their profile.

URL Path (POST) `api/v1/users/update`

Payload Example:
```
{
    "name":"Ibrahim Abdulsemiu",
}
```
Response Example:
```
{
    "timestamp": 1657521234,
    "code": 200,
    "path": "/api/v1/users/update",
    "method": "PUT",
    "status": "Successful",
    "message": "User was successful updated!",
    "data": {
        "id": "62cbc24e4a985595be049691",
        "name": "Ibrahim Lanre",
        "username": "joe234@gmail.com",
        "isActive": true,
        "createdAt": "2022-07-06T14:57:42.716Z",
        "modifiedAt": "2022-07-11T06:33:54.436Z"
    }
}
```

4. Logout User endpoint allows the user to logout from the API.

URL Path (GET) `api/v1/users/logout`

No Payload:

Response Example:
```
{
    "timestamp": 1657519847,
    "code": 200,
    "path": "/api/v1/users/logout",
    "method": "GET",
    "status": "Successful",
    "message": "User was successful logout!"
}
```

5. The Create Todo list endpoint allows the user to create a new to-do task. The payload contains fields such as "summary". It allows 2 min and 30 max characters. "description" allows 5 min and 8000 max characters. "cardColor" allaws hex color, for example, #32a852 ,#32a852 , #3255a8 or #a87d32.
For more color, go to `https://www.color-hex.com/`. 

URL Path (POST) `api/v1/todo/create`

Payload Example:
```
{
    "summary": "User CRUD",
    "description": "Implement USER API with node.js and mongoDB",
    "cardColor":  "#cddc39" || #32a852 || #32a852 || #3255a8
}
```
Response Example:
```
{
    "timestamp": 1657519975,
    "code": 201,
    "path": "/api/v1/todo/create/",
    "method": "POST",
    "status": "Successful",
    "message": "Todo was successful created!!",
    "data": {
        "id": "62cbbf664a985595be049684",
        "userId": "62cbc24e4a985595be049691",
        "summary": "User CRUD",
        "description": "Implement USER API with node.js and mongoDB",
        "stage": "pending",
        "cardColor": "#cddc39",
        "createdAt": "2022-07-11T06:12:55.000Z"
    }
}
```

6. The Update to-do endpoint allows the user to update their to-do list with their ID. The payload contains fields; "summary" allows 2 min and 30 max characters and is optional. "description" allows 5 min to 8000 max characters and is optional. "cardColor" allows hex color, e.g., #32a852 ,#32a852 , #3255a8 or #a87d32 and is optional. "stage" allows the user to indicate the progress of a task, e.g. "progress", "pending", "review", "completed" and is optional.

URL Path with the Todo Id (PUT) `api/v1/todo/update/62c6a097003efdfa40f0b5f8`

Payload Example:
```
{
    "summary": "User CRUD",
    "description": "Implement CRUD User API with Node.js, MongoDB and GraphQL",
    "cardColor":  "#cddc39" || #32a852 || #32a852 || #3255a8
    "stage": "progress" || "pending"|| || "review" || "completed"
}
```
Response Example:
```
{
    "timestamp": 1657520087,
    "code": 200,
    "path": "/api/v1/todo/update/62cba4b62a22380bb9f26309",
    "method": "PUT",
    "status": "Successful",
    "message": "Todo was successful updated!!",
    "data": {
        "id": "62cba4b62a22380bb9f26309",
        "userId": "62c5a2e6b1d6ffaeecba900f",
        "summary": "User CRUD",
        "description": "Implement CRUD User API with Node.js, MongoDB and GraphQL",
        "stage": "completed",
        "cardColor": "#32a852",
        "createdAt": "2022-07-11T04:19:02.275Z",
        "isCompleted": true,
        "modifiedAt": "2022-07-11T06:14:47.072Z"
    }
}
```
7. The Fetch single Todo list endpoint allows the user to fetch a list of Todos by their ID.

 URL Path with the Todo Id (GET) `api/v1/todo/get/62c6a097003efdfa40f0b5f8`

Header Authorization, bearer with the user token: Authorization Bearer $token
No Payload:

Response Example:
```
{
    "timestamp": 1657520120,
    "code": 200,
    "path": "/api/v1/todo/get/62cba4b62a22380bb9f26309",
    "method": "GET",
    "status": "Successful",
    "message": "Todo was fetched successfully!!",
    "data": {
        "id": "62cba4b62a22380bb9f26309",
        "userId": "62c5a2e6b1d6ffaeecba900f",
        "summary": "User CRUD",
        "description": "Implement CRUD User API with Node.js, MongoDB and GraphQL",
        "stage": "completed",
        "cardColor": "#32a852",
        "createdAt": "2022-07-11T04:19:02.275Z",
        "isCompleted": true,
        "modifiedAt": "2022-07-11T06:14:47.072Z"
    }
}
```

8. The Fetch all todo endpoint allows the user to fetch all related todo records created by the user.

URL Path (GET) `api/v1/todo/get-all/`
No Payload:

Response Example:

```
{
    "timestamp": 1657520140,
    "code": 200,
    "path": "/api/v1/todo/get-all",
    "method": "GET",
    "status": "Successful",
    "message": "Todo was fetched successfully!!",
    "data": [
        {
            "id": "62c6b8d8e3d2332838d37c50",
            "userId": "62c5a2e6b1d6ffaeecba900f",
            "summary": "create todo api",
            "description": "implement todo crud using node.js and mongodb",
            "stage": "pending",
            "cardColor": "#cddc39",
            "createdAt": "2022-07-07T10:43:36.907Z",
            "isCompleted": false
        },
        {
            "id": "62c7b9a27dab99e60826b3b4",
            "userId": "62c5a2e6b1d6ffaeecba900f",
            "summary": "Create user update",
            "description": "Implement user update module",
            "stage": "review",
            "cardColor": "#cddc39",
            "createdAt": "2022-07-08T04:59:14.604Z",
            "isCompleted": false
        },
        {
            "id": "62c814d206d7fff43b3b80b1",
            "userId": "62c5a2e6b1d6ffaeecba900f",
            "summary": "Create user filter",
            "description": "Implement user filter module",
            "stage": "pending",
            "cardColor": "#cddc39",
            "createdAt": "2022-07-08T11:28:18.355Z",
            "isCompleted": false
        },
        {
            "id": "62c8a676b49150851b291e4f",
            "userId": "62c5a2e6b1d6ffaeecba900f",
            "summary": "User CRUD",
            "description": "Implement CRUD User API with Node.js, MongoDB and GraphQL",
            "stage": "pending",
            "cardColor": "#cddc39",
            "createdAt": "2022-07-08T21:49:42.024Z",
            "isCompleted": false
        },
        {
            "id": "62c8a827a7047467f092c272",
            "userId": "62c5a2e6b1d6ffaeecba900f",
            "summary": "Create docker container",
            "description": "Implement docker container for the project",
            "stage": "pending",
            "cardColor": "#cddc39",
            "createdAt": "2022-07-08T21:56:55.676Z",
            "isCompleted": false
        },
        {
            "id": "62c8aaeb39a737a9e0aebebd",
            "userId": "62c5a2e6b1d6ffaeecba900f",
            "summary": "Create docker ",
            "description": "Implement docker for the project",
            "stage": "pending",
            "cardColor": "#cddc39",
            "createdAt": "2022-07-08T22:08:43.739Z",
            "isCompleted": false
        },
        {
            "id": "62cba3fbd7d7f72c2591d180",
            "userId": "62c5a2e6b1d6ffaeecba900f",
            "summary": "Create SOLID",
            "description": "Implement solid design principle",
            "stage": "progress",
            "cardColor": "#cddc39",
            "createdAt": "2022-07-11T04:15:55.083Z",
            "isCompleted": false
        },
        {
            "id": "62cba4b62a22380bb9f26309",
            "userId": "62c5a2e6b1d6ffaeecba900f",
            "summary": "Create SOLID with design patterns",
            "description": "Implement solid design principle with design patterns",
            "stage": "completed",
            "cardColor": "#32a852",
            "createdAt": "2022-07-11T04:19:02.275Z",
            "isCompleted": true,
            "modifiedAt": "2022-07-11T06:14:47.072Z"
        },
        {
            "id": "62cbb023de2e26fd0526fa90",
            "userId": "62c5a2e6b1d6ffaeecba900f",
            "summary": "Create Todo template",
            "description": "Implement todo web template with bootstrap",
            "stage": "completed",
            "cardColor": "#cddc39",
            "createdAt": "2022-07-11T05:07:47.553Z",
            "isCompleted": true
        }
    ]
}
```
9. The Dalete todo endpoint allows the user to delete a record in the todo list by its Id..

URL Path with the Todo Id (DELETE) `api/v1/todo/delete/62cba3fbd7d7f72c2591d180`
No Payload:

Response Example:
```
{
    "timestamp": 1657520161,
    "code": 200,
    "path": "/api/v1/todo/delete/62cba3fbd7d7f72c2591d180",
    "method": "DELETE",
    "status": "Successful",
    "message": "Todo was deleted successfully!!"
}
```