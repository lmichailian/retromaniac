import { io } from "socket.io-client";
import Store from "./src/store";
import "./src/components/app-dialog.js";
import "./src/components/app-navbar.js";

window.app = {
  store: Store,
};

const socket = io("http://localhost:3001");

window.addEventListener("newUser", (event) => {
  socket.emit("newUser", event.detail);
});

socket.on("streams", (streams) => {
  window.dispatchEvent(new CustomEvent("streams", { detail: streams }));
});
