const express = require('express')
const http = require('http')
const { allowedNodeEnvironmentFlags } = require('process')
const socketIO = require('socket.io')
const {formatMessage} = require('./utils/utils')

const PORT = process.env.PORT || 8080
const app = express()
const httpServer = http.createServer(app)
const io = socketIO(httpServer)

const messages = []
const users = []
// Middlewares
app.use(express.static('./public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
// Routes
app.post('/login', (req,res)=>{
  const {username} = req.body
  res.redirect(`/chat?username=${username}`)
})
app.get('/chat', (req,res)=>{
  res.sendFile(__dirname + '/public/chat.html')
})

// Listen
httpServer.listen(PORT, ()=>{
  console.log('Running')
})

// Sockets events
const botName = 'Shutbot'
io.on('connection',(socket)=>{
  console.log('Nueva conexión')
  //enviar mensajes
  socket.emit('messages', [...messages])

  //Join Chat
  socket.on('join-chat', ({username})=>{
    const newUser = {
      id : socket.id,
      username
    }
    users.push(newUser)
    socket.emit('chat-message', formatMessage(null,botName,'Welcome to Shutapp'))
    //Broadcast user connection
    socket.broadcast.emit('chat-message', formatMessage(null, botName, `${username} has joined the chat`))

  }) 
socket.on('new-message', (msg)=>{
  const user = users.find(user => user.id === socket.id)
  const newMessage = formatMessage(socket.id, user.username, msg)
  messages.push(newMessage)
  io.emit('chat-message', newMessage)
})


})

