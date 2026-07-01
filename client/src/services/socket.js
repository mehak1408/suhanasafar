import { io } from "socket.io-client";

const socket = io("https://suhana-safar-backend.onrender.com", {
  transports: ["websocket", "polling"],
});

export default socket;
