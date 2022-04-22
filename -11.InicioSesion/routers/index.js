const express = require('express')
const {getMockedItems} = require('../db/MockApi')
const apiRoutes= require('./api/api.routes') 

const ProductsDao = require('../models/daos/productsDao')
const productsDao = new ProductsDao()
const router = express.Router()

router.use('/api', apiRoutes);

router.get('/', async (req,res)=>{
    if(req.session.contador){
        ++req.session.contador
    } 
    const sessionName = req.name
    const sessionCounter = req.contador
    const products = await productsDao.getAll()
    res.render('index', {products, sessionName, sessionCounter})
})

router.get('/desloguear', (req,res)=>{
    req.logout();
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

module.exports = router