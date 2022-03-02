const express = require('express')
const {engine} = require('express-handlebars')
const path = require('path')
const http = require('http')
const socketIO = require('socket.io')
// Websockets - Tabla
const {products} = require('./data/data')
const moment = require('moment')

const PORT = process.env.PORT || 8080;
const app = express();
const httpServer = http.createServer(app)
const io = socketIO(httpServer)

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
let currentUser = ''
function formatMessage(id, email, text){
    return {
      id,
      email,
      text,
      time: moment().calendar()
    }
  }

io.on('connection',(socket)=>{
    // Websockets - Tabla
    socket.on('new-product', (newProduct)=>{
        products.push(newProduct)
        io.emit('render-new-product', newProduct)
    })
    socket.emit('allProducts', [...products])
    
    // Websockets - Chat
    socket.on('newEmail',(email)=>{
        currentUser = email
    })
    socket.on('updateNewMessage', (text)=>{
        const newMessage = formatMessage(socket.id, currentUser, text)
        allMessages.push(newMessage)
        io.emit('newMessage', newMessage)
    })
})  
