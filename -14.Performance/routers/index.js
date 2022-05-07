const express = require('express')
const {getMockedItems} = require('../db/MockApi')
const apiRoutes= require('./api/api.routes')
const os = require('os')
const compression = require('compression')

const {middleLogger} = require('../middlewares/loggersFunctions')
const {warnLogger, errorLogger} = require('../utils/logger/index')
const ProductsDao = require('../models/daos/productsDao')
const productsDao = new ProductsDao()
const router = express.Router()
const minimist = require('minimist')
const { runMain } = require('module')
const args = minimist(process.argv.slice(2), {
    default:{
        PORT: 8080,
        MODE: 'FORK'
    },
    alias:{
        p:'PORT',
        m:'MODE'
    }
})

router.use('/api', apiRoutes);
router.use(middleLogger)

router.get('/', async (req,res)=>{
    try {
        const sessionName = req.user
        const products = await productsDao.getAll()
        res.render('index', {products, sessionName})
    } catch (error) {
        errorLogger.error(new Error(error));
    }
})
router.get('/desloguear', (req,res)=>{
    const deslogueoName = req.user
    req.logout();
    console.log('User logued out!');
    res.render('index',{deslogueoName})

});

router.get('/api/productos-test', (req,res)=>{
    const products = getMockedItems(5)
    res.render('index', {products, sessionName})
})

router.get('/register-error', (req, res) => {
    res.render('index', { titleError: "register-error" , message: "USER ERROR SIGNUP" });
});
router.get('/login-error', (req, res) => {
    res.render('index', { titleError: "login-error" , message: "USER ERROR LOGIN" });
});


router.get('/info', compression(),(req,res)=>{
    const info = {
        inputArguments: JSON.stringify(args),
        cpuNumber:      os.cpus().length,
        platformName:   process.platform,
        versionNode:    process.version,
        rss:            process.memoryUsage().rss,
        path:           process.argv[0],
        processId:      process.pid,
        projectFolder:  `${process.cwd()}`
    }
    console.log(info)
    
    res.render('index', {info})
});
router.get('*', (req, res)=>{
    const router = req.url;
    const method = req.method;
    warnLogger.warn(`Route: ${router}. Method: ${method}`);
    res.send('no bueno. Mal ahí: 404', 404);
  });

module.exports = router  