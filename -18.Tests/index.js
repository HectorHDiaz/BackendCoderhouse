const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const passport = require('./routers/auth/passport');
const path = require('path');
const {engine} = require('express-handlebars');
const apiRoutes = require('./routers/indexRoutes')
const dbConfig=require('./utils/dbConfig');
const {infoLogger, errorLogger, consoleLogger} = require('./utils/logger/index')

const minimist = require('minimist')
const cluster = require('cluster')
const os = require('os');

const PORT = process.env.PORT || 8080;

const args = minimist(process.argv.slice(2), {
    default:{
        MODE: 'FORK'
    },
    alias:{
        m:'MODE'
    }
})

if(args.MODE =='CLUSTER'){
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
        secret:process.env.COOKIE_SECRET,
        resave:false,
        saveUninitialized: false,
        cookie:{maxAge:24 * 60 * 60 * 1000},
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
    app.listen(PORT, ()=>{
        mongoose.connect(dbConfig.mongodb.connectTo('ProyectoFinal'))
    .then(() => {
        infoLogger.info('Connected to DB!');
        consoleLogger.info('Server is up and running on port:', PORT);
    })
    .catch(err => {
        errorLogger.error(`An error occurred while connecting the database`);
        errorLogger.error(`Error en servidor `, err);
        })
    });
}