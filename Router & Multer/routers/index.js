const express= require('express')
const usersRoutes = require('./users/users.route')
const productsRoutes = require('./products/products.route')
const filesRoutes = require('./files/files.routes')

const router = express.Router()

router.use(express.json());
router.use(express.urlencoded({extended:true}))

router.use('/products', productsRoutes)
router.use('/users', usersRoutes)
router.use('/files', filesRoutes)

module.exports = router