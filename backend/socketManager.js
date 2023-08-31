const socketIO = require("socket.io");
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} = require("./utils/users.js");

let ioInstance;

function setupSocket(server) {
  ioInstance = socketIO(server, {
    pingTimeout: 60000,
    cors: {
      origin: "http://localhost:3000",
    },
  });

  ioInstance.on("connection", (socket) => {
    console.log("Connection ", socket.id);

    // When client subscribe room
    socket.on("subscribe", ({arg, user}) => {
      const data = userJoin(socket.id, user.email, arg._id)
      socket.join(data.room);
      ioInstance.to(data.room).emit("message", `${data.username} has join the chat`);
    });

    // When client unsubscribe room
    socket.on('unsubscribe', (roomId) => {
      console.log(`User is unsubscribing from room: ${roomId}`);
      socket.leave(roomId);
    });

    // Runs when client disconnects
    socket.on("disconnect", () => {
      const data = userLeave(socket.id);
      if (data) {
        socket.to(data.room).emit(
          "message", `${data.username} has left the chat`
        );

        // Send users and room info
        socket.to(data.room).emit("roomUsers", {
          room: data.room,
          users: getRoomUsers(data.room),
        });
      }
    });
  });
}

function getIOInstance() {
  if (!ioInstance) {
    throw new Error("Socket.io instance is not set up yet");
  }
  return ioInstance;
}

module.exports = { setupSocket, getIOInstance };
