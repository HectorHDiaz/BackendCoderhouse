
require('dotenv').config();
const express = require('express')
const Contenedor = require('./contenedor/contenedorFirebase')

const session = require('express-session')
const MongoStore = require('connect-mongo') 

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

//middlewares
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

app.use(session({
    name:'session10',
    secret:'desafio10',
    resave:false,
    saveUninitialized: false,
    rolling:true,
    cookie:{maxAge:60000},
    store: MongoStore.create({mongoUrl: process.env.MONGO})
}))

//Routes
app.get('/', (req,res)=>{
    if(req.session.contador){
        ++req.session.contador
    } 
    const sessionName = req.session.name
    const sessionCounter = req.session.contador
    res.render('index', {products, sessionName, sessionCounter})
})
app.get('/api/productos-test', (req,res)=>{
    const products = getMockedItems(5)
    res.render('index', {products, sessionName})
})
app.post('/', (req,res)=>{
    req.session.name = req.body.name;
    req.session.contador = 1;
    req.session.save(()=>{
    res.redirect('/')
    })
})
app.get('/desloguear', (req,res)=>{
    const deslogueoName = req.session.name
    req.session.destroy(err=>{
        if(err){
            res.json({error:'olvidar', body:err})
        }else{
            res.clearCookie('session10')
            res.render('index',{deslogueoName})
        }
    })
});

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
    // Websockets - Tabla
    const allProducts = await products.getAll()
    socket.emit('allProducts', allProducts)

    socket.on('new-product', async newProduct=>{
        await products.save(newProduct)
        io.emit('render-new-product', newProduct)
    })

    // Websockets - Chat
    const chatBot = {
        email: 'chatbot@chat.com', 
        nombre: 'Chatbot', 
        apellido: '', 
        edad: '', 
        alias: 'Chatbot',
        avatar:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKtaUBFUeoZYmRpgnrt1rq0rlxr_y6LDeDULOYbwNVnrjiFqNMckqaxBQLBBMQCM2C_Q4&usqp=CAU',
      }

      const getnormalizedMessages = async ()=>{
          const messages = {
            id:'messages',
            messages:[... await allMessages.getAll()]
        }
        const userSchema = new schema.Entity('user', {},{
            idAttribute: 'email'
        })
        const messageSchema = new schema.Entity('message',{
            author: userSchema
        });
        const chatSchema = new schema.Entity('chat',{
            messages:[ messageSchema ]
        });
        return normalize(messages, chatSchema)
    }

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
