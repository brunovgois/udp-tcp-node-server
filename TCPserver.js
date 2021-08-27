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

      const newString = inverseCapitalization(message);
      
      message = newString.join("")
      
      console.log("response: " + message)
      response.end(message);
    });
  } else {
    response.statusCode = 404;
    response.end();
  }
}).listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


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