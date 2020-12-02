const  path  = require('path');
const http = require('http')
const express = require('express');
const socketio = require('socket.io');
const {generatMessage,generateLocationMessage }= require('./utils/message')
const app = express()
const Filter = require('bad-words')
const port = process.env.port || 3000;
const server = http.createServer(app)
app.use(express.json());
const io = socketio(server)
const {addUser,removeUser,getUser,getUserinRoom}  = require('./utils/users')

const publicDirectoryPath = path.join(__dirname,'./public')
app.use(express.static(publicDirectoryPath))


io.on('connection',(socket)=>{
    console.log("new websocket connection ")


socket.on('join',(options,callback)=>{
   const {error,user} = addUser({id:socket.id,...options})
   if(error){
       return callback(error)
   }

    socket.join(user.room)


    socket.emit('message',generatMessage('Admin','welcome'))
    socket.broadcast.to(user.room).emit('message',generatMessage('Admin',`${user.username} has joined`))
io.to(user.room).emit('roomData',{
    room:user.room,
    users:getUserinRoom(user.room)
})
    callback()
})







socket.on('sendmessage',(message, callback)=>{
const user = getUser(socket.id)
const filter = new Filter()
if(filter.isProfane(message)){
    return  callback('profanity is not alllowed')
}


    io.to(user.room).emit('message',generatMessage(user.username,message))
callback()
})




socket.on('sendlocation',(coords,callback)=>{
const user = getUser(socket.id)
    io.to(user.room).emit("locationMessage",generateLocationMessage(user.username,`https://google.com/maps?q=:${coords.latitude},${coords.longitude}`))
callback()
})


socket.on('disconnect',()=>{
   const user =  removeUser(socket.id)
    if(user){
    io.to(user.room).emit('message',generatMessage('Admin',`${user.username} has left`))
    io.to(user.room).emit('roomData',{
        room:user.room,
        users:getUserinRoom(user.room)
    })
    }

})
 })



server.listen(port,()=>{
    console.log("the server is running at "+ port)
})