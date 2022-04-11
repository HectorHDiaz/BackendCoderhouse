const express = require('express')
const  {Server: HttpServer } = require('http')
const  {Server: IOServer } = require('socket.io')

const PORT =    process.env.PORT || 8080
const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
const messagesArray = []
//middlewares
app.use(express.static('./public'))

const connectedServer = httpServer.listen(PORT, ()=>{
    console.log(`Server running on Port: ${PORT}`)
})

connectedServer.on('error', (error)=>{
    console.log(error.message)
})

// Sockets

io.on('connection', (socket)=>{
    console.log('User connected')
    socket.emit('server-message', 'Message from Server')
    socket.emit('messages', messagesArray)
    socket.on('confirmation', (data)=>{
        console.log('OK')
    })
    //Desafío

    socket.on('message',(data)=>{
        const newMessage = {userId : socket.id, message : data}
        messagesArray.push(newMessage)      
        io.emit('messages', messagesArray)
    })
})


 