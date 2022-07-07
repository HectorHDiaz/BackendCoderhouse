const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const passport = require('./controllers/passport');
const path = require('path');
const {engine} = require('express-handlebars');
const apiRoutes = require('./routers/indexRoutes')
const {infoLogger, errorLogger, consoleLogger} = require('./utils/logger/index')

const cluster = require('cluster')
const os = require('os');
const config = require('./config/config');


if(config.MODE =='CLUSTER'){
    if(cluster.isPrimary){
        infoLogger.info(`Proceso principal, N°: ${process.pid}`)
        const CPUS_NUM = os.cpus().length;
        for(let i = 0; i< CPUS_NUM;i++){
            cluster.fork()
        }
    }else{
        infoLogger.info(`Proceso secundario, N°: ${process.pid}`)
        allServer();
    }
}else{
    allServer();
}

function allServer(){
    //Server
    const app = express();

    //middlewares
    app.use(express.static('views'));
    app.use('/views', express.static(__dirname + '/views'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(session({
        name:'coder-session',
        secret:config.COOKIE_SECRET,
        resave:false,
        saveUninitialized: false,
        cookie:{maxAge:3000},
        store: MongoStore.create({mongoUrl: config.mongodb.connectTo('sessions')})
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
    app.listen(config.PORT, ()=>{
        mongoose.connect(config.mongodb.connectTo('ProyectoFinal'))
    .then(() => {
        infoLogger.info('Connected to DB!');
        consoleLogger.info('Server is up and running on port:', config.PORT);
    })
    .catch(err => {
        errorLogger.error(`An error occurred while connecting the database`);
        errorLogger.error(`Error en servidor `, err);
        })
    });
}