import express from "express";
import morgan from "morgan";
import { Server } from "socket.io";

const app = express();

app.use(morgan("dev"));

const io = new Server({
  cors: {
    origin: "*",
  },
});

const streams = [];

io.on("connection", (socket) => {
  io.emit("streams", streams);

  socket.on("newUser", (user) => {
    streams.push({ id: socket.id, user });

    io.emit("streams", streams);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected", socket.id);

    const index = streams.findIndex((stream) => stream.id === socket.id);

    if (index !== -1) {
      streams.splice(index, 1);
    }

    io.emit("streams", streams);
  });
});

io.listen(3001);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
