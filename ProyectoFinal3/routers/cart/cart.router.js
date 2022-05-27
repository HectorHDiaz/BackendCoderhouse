const express = require('express')

const {
    postNewCart,
    deleteCart,
    getCartProducts,
    postNewProduct,
    deleteProductCart,
    purchaseCart
} = require('../../controllers/cart.controller')

const router = express.Router()

router.use(express.json())
router.use(express.urlencoded({extended:true}))

router.get('/', (req,res)=>{
    res.render('cart.html')
})
router.post('/', postNewCart)
router.delete('/:cartId', deleteCart)
router.get('/:cartId' ,getCartProducts)
router.post('/:cartId/products/:productId', postNewProduct)
router.delete('/:cartId/products/:productId', deleteProductCart)
router.post('/:cartId', purchaseCart)

module.exports = router