const express = require('express')
const productsRouter = require('./products/products.router')
const cartRouter = require('./cart/cart.router')

const router = express.Router()

router.use(express.json())
router.use(express.urlencoded({extended:true}))

router.use('/products', productsRouter)
router.use('/cart', cartRouter)

module.exports = router