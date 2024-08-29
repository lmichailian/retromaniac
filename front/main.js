import { io } from "socket.io-client";
import Store from "./src/store";
import "./src/components/app-dialog.js";
import "./src/components/app-navbar.js";

window.app = {
  store: Store,
};

const socket = io("http://localhost:3001");

window.addEventListener("newUser", (event) => {
  const roomId =
    location.search.split("roomId=")[1] ||
    Math.random().toString(36).substr(2, 9);

  socket.emit("join-room", roomId);
  history.pushState({}, "", `/?roomId=${roomId}`);

  socket.emit("newUser", { room: roomId, user: event.detail });
});

socket.on("streams", (streams) => {
  window.dispatchEvent(new CustomEvent("streams", { detail: streams }));
});
