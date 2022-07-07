const express = require('express')

const CartController = require('../../controllers/cart.controller')

const cartController = new CartController()
const router = express.Router()

router.use(express.json())
router.use(express.urlencoded({extended:true}))

router.get('/', (req,res)=>{
    res.render('cart.html')
})
router.post('/', cartController.postNewCart)
router.get('/:cartId' , cartController.getCartProducts)
router.post('/:cartId/products/:productId', cartController.postNewProduct)
router.delete('/:cartId/products/:productId', cartController.deleteProductCart)
router.post('/:cartId', cartController.purchaseCart)

module.exports = router