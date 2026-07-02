import { io } from "socket.io-client";

const socket = io("https://suhanasafar.onrender.com", {
  transports: ["websocket", "polling"],
});

export default socket;