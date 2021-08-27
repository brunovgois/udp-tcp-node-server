// import dgram from 'dgram';

// const server = dgram.createSocket('udp4');

// server.on('error', (err) => {
//   console.log(`server error:\n${err.stack}`);
//   server.close();
// });

// server.on('message', (msg, rinfo) => {
//   console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
// });

// server.on('listening', () => {
//   const address = server.address();
//   console.log(`server listening ${address.address}:${address.port}`);
// });

// server.bind(41234);
// // Prints: server listening 0.0.0.0:41234
const http = require('http');
const hostname = '127.0.0.1';
const port = 8080

http.createServer((request, response) => {
  if (request.method === 'POST' && request.url === '/inversion') {
    let body = [];
    request.on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      let message = Buffer.concat(body).toString();
      
      const aux = message.split("")
      for (let index = 0; index < message.length; index++) {
        if(message.charAt(index) == message.charAt(index).toUpperCase()) {
          aux[index] = message.charAt(index).toLowerCase()
        } else {
          aux[index] = message.charAt(index).toUpperCase()
        }
      }
      
      message = aux.join("")

      response.end(message);
    });
  } else {
    response.statusCode = 404;
    response.end();
  }
}).listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});