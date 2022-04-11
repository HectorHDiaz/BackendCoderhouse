const express = require('express')

const http = require('http')
const socketIO = require('socket.io')

const app = express();
const httpServer = http.createServer(app)
const io = socketIO(httpServer)

const path = require('path')
const moment = require('moment')
const {engine} = require('express-handlebars')

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('views'))

app.engine('hbs', engine({
    extname:'hbs',
    defaultLayout:'main',
    layoutsDir:path.resolve(__dirname,"./views/layouts"),
    partialDir:path.resolve(__dirname, "./views/partials")
}))
app.set('views', './views/')
app.set('view engine', 'hbs')


app.get('/', (req,res)=>{
    res.render('index', {products})
})

httpServer.listen(PORT, ()=>{
    console.log("Running...")
})

// Websockets - Chat
const allMessages = []
const users = []
const products = []

function formatMessage(id, email, text){
    return {
      id,
      email,
      text,
      time: moment().calendar()
    }
  }
io.on('connection',(socket)=>{
    console.log('Nuevo cliente conectado')
    // Websockets - Tabla
    socket.emit('allProducts', products)

    socket.on('new-product', newProduct=>{
        products.push(newProduct)
        io.emit('render-new-product', newProduct)

    })
    
    // Websockets - Chat
    const botName = 'AtonomoBot'
    socket.on('newEmail',(email)=>{
        const newUser = {
            id : socket.id,
            email
          }
        users.push(newUser)
        socket.emit('newMessage', formatMessage(null,botName,'Bienvenido al Chat'))
        socket.broadcast.emit('newMessage', formatMessage(null, botName, `${email} se unió!`))
        socket.emit('allMessages', allMessages)
    })
    socket.on('updateNewMessage', (text)=>{
        const user = users.find(user => user.id === socket.id)
        const newMessage = formatMessage(socket.id, user.email, text)
        allMessages.push(newMessage)
        io.emit('newMessage', newMessage)
    })
})  