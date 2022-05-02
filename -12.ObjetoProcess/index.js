require('dotenv').config();
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const path = require('path');
const passport = require('./middlewares/passport');
const {engine} = require('express-handlebars');
const minimist = require('minimist')

const http = require('http');
const socketIO = require('socket.io');
const dbConfig=require('./db/config');
const apiRoutes = require('./routers/index');

const addMessagesHandlers = require('./routers/ws/addMessageSocket');
const addProductsHandlers = require('./routers/ws/addProductsSocket');

const args = minimist(process.argv.slice(2), {
    default:{
        PORT: 8080,
    },
    alias:{
        p:'PORT'
    }
})

//Server
const app = express();
const httpServer = http.createServer(app);
const io = socketIO(httpServer);

//Socket 
io.on('connection',async socket=>{
    console.log('Nuevo cliente conectado');
    addMessagesHandlers(socket, io.sockets);
    addProductsHandlers(socket, io.sockets);
}) 

//middlewares
app.use(express.static('views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    name:'coder-session',
    secret:process.env.COOKIE_SECRET,
    resave:false,
    saveUninitialized: false,
    cookie:{maxAge:60000},
    store: MongoStore.create({mongoUrl: dbConfig.mongodb.connectTo('sessions')})
}));
app.use(passport.initialize());
app.use(passport.session());

//Template Engines
app.engine('hbs', engine({
    extname:'hbs',
    layoutsDir:path.resolve(__dirname,"./views/layouts"),
    partialDir:path.resolve(__dirname, "./views/partials")
}))
app.set('views', './views/');
app.set('view engine', 'hbs');

//Routes
app.use('(api', apiRoutes);

//Inicio de Server
httpServer.listen(args.PORT, ()=>{
    mongoose.connect(dbConfig.mongodb.connectTo('ProyectoDesafios'))
  .then(() => {
    console.log('Connected to DB!');
    console.log('Server is up and running on port:', args.PORT);
  })
  .catch(err => {
		console.log(`An error occurred while connecting the database`);
		console.log(`Error en servidor `, err);
	})
});

