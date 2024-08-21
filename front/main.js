import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

let socketId = "";

socket.on("connect", (socket) => {});

socket.on("newUsers", (data) => {
  console.log(data);
  socketId = socket.id;
  document.querySelector("main").innerHTML = `
    <h1>Socket ID: ${socket.id}</h1>
    <h2>Connected users:</h2>
    <ul>
      ${data.all.map((id) => `<li>${id}</li>`).join("")}
  `;
});

window.addEventListener("beforeunload", () => {
  socket.disconnect();
});
