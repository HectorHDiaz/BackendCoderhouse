const express = require('express')
const {adminChecker} = require('../../middleware/adminChecker')
const {
    postNewCart,
    deleteCart,
    getCartProducts,
    postNewProduct,
    deleteProductCart
} = require('../../models/cart/cart.api')

const router = express.Router()

router.use(express.json())
router.use(express.urlencoded({extended:true}))

router.post('/',adminChecker, postNewCart)
router.delete('/:cartId',adminChecker, deleteCart)
router.get('/:cartId' ,adminChecker,getCartProducts)
router.post('/:cartId/products',adminChecker, postNewProduct)
router.delete('/:cartId/products/productId',adminChecker, deleteProductCart)

module.exports = router