require('dotenv').config();
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const path = require('path');
const passport = require('./middlewares/passport');
const {engine} = require('express-handlebars');

const http = require('http');
const socketIO = require('socket.io');
const dbConfig=require('./db/config');
const apiRoutes = require('./routers/index');

const addMessagesHandlers = require('./routers/ws/addMessageSocket');
const addProductsHandlers = require('./routers/ws/addProductsSocket');

const minimist = require('minimist')
const cluster = require('cluster')
const os = require('os');

const PORT = process.env.PORT || 8080;

const args = minimist(process.argv.slice(2), {
    default:{
        PORT: 8081,
        MODE: 'FORK'
    },
    alias:{
        p:'PORT',
        m:'MODE'
    }
})



if(args.MODE =='CLUSTER'){
    if(cluster.isPrimary){
        console.log(`Proceso principal, N°: ${process.pid}`)
        const CPUS_NUM = os.cpus().length;
        for(let i = 0; i< CPUS_NUM;i++){
            cluster.fork()
        }
    }else{
        console.log(`Proceso secundario, N°: ${process.pid}`)
        allServer();
    }
}else{
    allServer();
}

function allServer(){
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
    app.use(apiRoutes);

    //Inicio de Server
    httpServer.listen(PORT, ()=>{
        mongoose.connect(dbConfig.mongodb.connectTo('ProyectoDesafios'))
    .then(() => {
        console.log('Connected to DB!');
        console.log('Server is up and running on port:', PORT);
    })
    .catch(err => {
            console.log(`An error occurred while connecting the database`);
            console.log(`Error en servidor `, err);
        })
    });
}