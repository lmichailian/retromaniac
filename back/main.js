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
  socket.on("join-room", (room) => {
    socket.join(room);

    io.to(room).emit(
      "streams",
      streams.filter((stream) => stream.room === room)
    );

    socket.on("newUser", ({ user, room }) => {
      streams.push({ id: socket.id, user, room });

      io.to(room).emit(
        "streams",
        streams.filter((stream) => stream.room === room)
      );
    });
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
