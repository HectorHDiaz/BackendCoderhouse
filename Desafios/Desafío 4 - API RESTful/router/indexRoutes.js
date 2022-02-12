const express = require('express')
const router = require('./productos/productos.route')
const productsRouter = require('./productos/productos.route')

const routers = express.Router()

router.use(express.json())
router.use(express.urlencoded({extended:true}))

router.use('/productos', productsRouter)

module.exports = routers