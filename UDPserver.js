const dgram = require('dgram');

const socket = dgram.createSocket({type: 'udp4', reuseAddr: true},
(buffer, sender) => {
    const message = buffer.toString();
    const invertedMessage = inverseCapitalization(message)
    console.log({
        kind: "UDP_MESSAGE",
        message,
        sender
      });

      socket.send(invertedMessage, sender.port, sender.address, error => {
        if (error) {
          console.error(error);
        } else {
          console.log({
            kind: "RESPOND",
            message: invertedMessage,
            sender
          });
        }
      });
}
);

socket.bind(8080, "127.0.0.1");

function inverseCapitalization(message) {
    const aux = message.split("")
    for (let index = 0; index < message.length; index++) {
      if (message.charAt(index) == message.charAt(index).toUpperCase()) {
        aux[index] = message.charAt(index).toLowerCase();
      } else {
        aux[index] = message.charAt(index).toUpperCase();
      }
    }
    return aux
  }