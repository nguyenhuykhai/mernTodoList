require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");
const chatRoutes = require("./routes/chat");
const roomRoutes = require("./routes/room");


const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routers
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/room", roomRoutes);

// connect to db
mongoose
  .connect(process.env.MONG_URI)
  .then(() => {
    // listten for request
    const server = app.listen(process.env.PORT, () => {
      console.log("listening on port ", process.env.PORT);
    });

    const io = require('socket.io')(server, {
      pingTimeout: 60000,
      cors: {
        origin: "http://localhost:3000",
      },
    });

    io.on("connection", (socket) => {
      console.log("connection ", socket.id);

      socket.on('setup', (userData) => {
        socket.join(userData._id);
        console.log(userData._id);
        socket.emit('connected');
      })

      socket.on('join chat', () => {
        socket.join(room)
        console.log("User joined room ", + room);
      })
    });
  })
  .catch((error) => {
    console.log(error);
  });
