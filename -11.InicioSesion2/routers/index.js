const express = require('express')
const {getMockedItems} = require('../db/MockApi')
const apiRoutes= require('./api/api.routes') 
const auth = require('../middlewares/auth')

const ProductsDao = require('../models/daos/productsDao')
const productsDao = new ProductsDao()
const router = express.Router()

router.use('/api', apiRoutes);



router.get('/',auth, async (req,res)=>{
    if(req.session.contador){
        ++req.session.contador
    } 
    const sessionName = req.session.name
    const sessionCounter = req.session.contador
    const products = await productsDao.getAll()
    res.render('index', {products, sessionName, sessionCounter})
})
router.get('/login', (req,res)=>{
    res.render('login')
})

router.get('/desloguear', (req,res)=>{
    const deslogueoName = req.session.name
    req.logout();
    req.session.destroy(err=>{
        if(err){
            res.json({error:'olvidar', body:err})
        }
        res.render('index',{deslogueoName})
    })
    res.clearCookie('session10')
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