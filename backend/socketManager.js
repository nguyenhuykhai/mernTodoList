const socketIO = require("socket.io");

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

    socket.on("setup", (userData) => {
      socket.join(userData._id);
      console.log(userData._id);
      socket.emit("connected");
    });

    socket.on("userJoinedRoom", (arg) => {
      const room = arg._id;
      console.log(room);
      socket.join(room);
      ioInstance.to(room).emit("userJoined", "JOIN");
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
