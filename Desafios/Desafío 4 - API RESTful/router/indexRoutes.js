const express = require('express')
const productsRouter = require('./productos/productos.route')

const router = express.Router()

router.use(express.json())
router.use(express.urlencoded({extended:true}))

router.use('/products', productsRouter)

module.exports = router