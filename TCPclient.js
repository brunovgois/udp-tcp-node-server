const http = require('http')

const data = JSON.stringify({
  message: 'turma de engenharia - tcp'
})

const options = {
  hostname: '127.0.0.1',
  port: 8080,
  path: '/inversion',
  method: 'POST',
}

const req = http.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`)

  res.on('data', d => {
    process.stdout.write(d)
  })
})

req.on('error', error => {
  console.error(error)
})

req.write(data)
req.end()