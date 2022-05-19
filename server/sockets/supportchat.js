import { Server } from "socket.io";

const io = new Server();

io.on("open-chat", (socket) => {
  console.log(socket.id);
});

export default io;
