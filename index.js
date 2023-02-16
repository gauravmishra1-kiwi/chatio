const path =require('path')
const http = require('http')
const express=require('express')
const app=express();
const socketio=require('socket.io')

const server=http.createServer(app)
const io=socketio(server)

const port=process.env.PORT||3000
const publicDirectoryPath=path.join(__dirname,'./public')

app.use(express.static(publicDirectoryPath))

let count =0
io.on('connection',(socket)=>{
    console.log('new websocket connection');

    socket.emit('message','Welcome');
    socket.broadcast.emit('message','here is new user joined')

    socket.on('sendMessage',(message,callback)=>{
        io.emit('message',message)
        callback()
    })

    socket.on('sendLocation',(coords)=>{
            io.emit('message',`http://www.google.com/maps?q=${coords.latitude},${coords.longitude}`)
    })

    socket.on('disconnect',()=>{
        io.emit('message','A user has left')
    })

})


server.listen(port,()=>{
    console.log(`server at ${port}`);
})