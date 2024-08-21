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

const connection = [];

io.on("connection", (socket) => {
  console.log("Client connected", socket.id);

  connection.push(socket.id);

  io.emit("newUsers", {
    current: socket.id,
    all: connection,
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected", socket.id);

    connection.splice(connection.indexOf(socket.id), 1);

    io.emit("newUsers", {
      current: socket.id,
      all: connection,
    });
  });
});

io.listen(3001);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
