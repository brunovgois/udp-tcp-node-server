const dgram = require("dgram");
const socket = dgram.createSocket("udp4");

const PORT = 8080;

socket.bind();
socket.on("listening", () => {
  socket.send("turma de engenharia - UDP", PORT, "127.0.0.1", err => {
    console.log(err ? err : "Sended");
  });

  socket.on("message", (buffer, sender) => {
    const message = buffer.toString();
    console.log(`Received message: ${message} from ${sender.address}`);
    socket.close();
  });
});