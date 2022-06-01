const express = require('express')
const apiRoutes= require('./api/api.routes')
const os = require('os')

const ProductsDao = require('../api/models/daos/productsDao')
const args = require('..')
const productsDao = new ProductsDao()
const router = express.Router()

router.use('/api', apiRoutes);

router.get('/', async (req,res)=>{
    const sessionName = req.user
    const products = await productsDao.getAll()
    res.render('index', {products, sessionName})
})

router.get('/desloguear', (req,res)=>{
    const deslogueoName = req.user
    req.logout();
    console.log('User logued out!');
    res.render('index',{deslogueoName})

});


router.get('/register-error', (req, res) => {
    res.render('index', { titleError: "register-error" , message: "USER ERROR SIGNUP" });
});
router.get('/login-error', (req, res) => {
    res.render('index', { titleError: "login-error" , message: "USER ERROR LOGIN" });
});

router.get('/info', (req,res)=>{
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
    res.render('index', {info})
});

module.exports = router