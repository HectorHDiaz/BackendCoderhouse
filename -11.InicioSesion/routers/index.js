const express = require('express')
const {getMockedItems} = require('../db/MockApi')
const apiRoutes= require('./api/api.routes') 

const ProductsDao = require('../models/daos/productsDao')
const productsDao = new ProductsDao()
const router = express.Router()

router.use('/api', apiRoutes);

router.get('/', async (req,res)=>{
    const sessionName = req.user
    const products = await productsDao.getAll()
    res.render('index', {products, sessionName})
})
//POST DE PRUEBA - CAMBIAR action EN "login.hbs"
router.post('/', (req,res)=>{
    req.session.userEmail = req.body.userEmail;
    req.session.contador = 1;
    req.session.save(()=>{
    res.redirect('/')
    })
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

module.exports = router