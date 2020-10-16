var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var app = express()
var port = process.env.PORT || 4030
const server = require('http').createServer();
const io = require('socket.io')(server);

// app.use(bodyParser.json())
// app.use(cors())
// app.use(
//   bodyParser.urlencoded({
//     extended: false
//   })
// )

io.on('connection', (socket) => {
    console.log('user connected')
    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
    socket.on('sent-message', function (message) {
        io.sockets.emit('new-message', message)
    })
})


server.listen(port, function () {
  console.log('Server is running on port: ' + port)

})