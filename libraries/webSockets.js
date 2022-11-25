class WebSockets {
    // users = [];
    // connection(client) {
    //   // event fired when the chat room is disconnected
    //   client.on("disconnect", () => {
    //     this.users = this.users.filter((user) => user.socketId !== client.id);
    //   });
    //   // add identity of user mapped to the socket id
    //   client.on("identity", (userId) => {
    //     this.users.push({
    //       socketId: client.id,
    //       userId: userId,
    //     });
    //   });
    //   // subscribe person to chat & other user as well
    //   client.on("subscribe", (room, otherUserId = "") => {
    //     this.subscribeOtherUser(room, otherUserId);
    //     client.join(room);
    //   });
    //   // mute a chat room
    //   client.on("unsubscribe", (room) => {
    //     client.leave(room);
    //   });
    // }
    connection(socket){
      console.log("Connected to socket.io");
      socket.on("setup", (userData) => {
        console.log(userData)
        socket.join(userData.id);
        socket.emit("connected");
      });
    
      socket.on("join chat", (room) => {
        socket.join(room);
        console.log("User Joined Room: " + room);
      });
      socket.on("typing", (room) => socket.in(room).emit("typing"));
      socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
    
      socket.on("new message", (newMessageRecieved) => {
        let chat = newMessageRecieved.chat;
    
        if (!chat.users) return console.log("chat.users not defined");
    
        chat.users.forEach((user) => {
          if (user.id == newMessageRecieved.sender.id) return;
    
          socket.in(user.id).emit("message recieved", newMessageRecieved);
        });
      });
    
      socket.off("setup", () => {
        console.log("USER DISCONNECTED");
        socket.leave(userData.id);
      });
    }
    // subscribeOtherUser(room, otherUserId) {
    //   const userSockets = this.users.filter(
    //     (user) => user.userId === otherUserId
    //   );
    //   userSockets.map((userInfo) => {
    //     const socketConn = global.io.sockets.connected(userInfo.socketId);
    //     if (socketConn) {
    //       socketConn.join(room);
    //     }
    //   });
    // }
  }
  
  module.exports = new WebSockets();