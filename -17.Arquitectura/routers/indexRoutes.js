const express = require('express')
const authRoutes= require('./auth/auth.route')
const infoRoutes= require('./info/info.route')

const ProductsDao = require('../models/daos/products/products.mongo.dao')

const productsDao = new ProductsDao()
const router = express.Router()

router.use('/auth', authRoutes.initialize());
router.use('/info', infoRoutes);

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

module.exports = router