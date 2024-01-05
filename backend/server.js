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
  mongoose.connect('mongodb://127.0.0.1:27017/chatRealTime', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // Listen for requests
    const server = app.listen(process.env.PORT, () => {
      console.log("Listening on port ", process.env.PORT);
    });

    const { setupSocket } = require('./socketManager');
    setupSocket(server);
  })
  .catch((error) => {
    console.log(error);
  });
