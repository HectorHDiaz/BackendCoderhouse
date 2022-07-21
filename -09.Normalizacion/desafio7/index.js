const express = require('express')
const Contenedor = require('./contenedor/contenedorFirebase')

const http = require('http')
const socketIO = require('socket.io')

const app = express();
const httpServer = http.createServer(app)
const io = socketIO(httpServer)

const path = require('path')
const moment = require('moment')
const {engine} = require('express-handlebars')

const {normalize,schema} = require("normalizr")

const {getMockedItems} = require('./db/MockApi')

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
app.get('/api/productos-test', (req,res)=>{
    const products = getMockedItems(5)
    res.render('index', {products})
})

httpServer.listen(PORT, ()=>{
    console.log("Running...")
})

// DB

const allMessages = new Contenedor('messages')
const products = new Contenedor('products')

const users = []

function formatMessage(author, text){
    return {
      author,
      time:`[${moment().format('L')} ${moment().format('LTS')}]`,
      text
    }
}

io.on('connection',async socket=>{
    console.log('Nuevo cliente conectado')
    // Websockets - Chat
    socket.on('newUser',async(user)=>{
        const newUser = {
            ...user,
            socketId: socket.id
        }
        console.log(newUser)
        users.push(newUser)
        const botWelcome = formatMessage(chatBot,'Bienvenido al Chat')
        const botJoin = formatMessage(chatBot, `${newUser.alias} se unió!`)
        await allMessages.save(botJoin)
        
        const normalizedData = await getnormalizedMessages()
        socket.emit(`allMessages`, normalizedData.result, normalizedData.entities);

        socket.emit('newMessage', botWelcome)
        socket.broadcast.emit('newMessage', botJoin)
    })

    socket.on('updateNewMessage', async (text)=>{
        const user = users.find(user => user.socketId === socket.id)
        const newMessage = formatMessage(user, text)
        await allMessages.save(newMessage)

        const normalizedData = await getnormalizedMessages()
        io.emit(`allMessages`, normalizedData.result, normalizedData.entities);
    })
})  
