const http = require('http')
const pid = process.pid

const server = http.createServer((req, res) => {
    res.end('Hello from server')
}) 

server.listen(3000, () => {
    console.log('started on 3000 with pid:' + pid)
})

