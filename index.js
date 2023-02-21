const path = require('path')
const http = require('http')
const express = require('express')
const app = express();
const socketio = require('socket.io')
const Filter = require('bad-words')
const { genrateMessage,genrateLocation } = require('./src/utils/message')

const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, './public')

app.use(express.static(publicDirectoryPath))

let count = 0
io.on('connection', (socket) => {
    console.log('new websocket connection');

    socket.emit('message', genrateMessage('welcome'));
    socket.broadcast.emit('message', genrateMessage('here is new user joined'))

    socket.on('sendMessage', (message, callback) => {

        const filter = new Filter()
        if (filter.isProfane(message)) {
            return callback('profanity is not allow')
        }

        io.emit('message', genrateMessage(message))
        callback()
    })

    socket.on('sendLocation', (coords, callback) => {
        io.emit('locationMessage', genrateLocation(`http://www.google.com/maps?q=${coords.latitude},${coords.longitude}`))
        callback();
    })

    socket.on('disconnect', () => {
        io.emit('message', genrateMessage('A user has left'))
    })

})


server.listen(port, () => {
    console.log(`server at ${port}`);
})