const express = require('express')
const {adminChecker} = require('../../middleware/adminChecker')

const {
    getAllProducts,
    getProductById,
    saveNewProduct,
    updateProduct,
    deleteProduct,
} = require('../../controllers/products.controller')
const router = express.Router()

router.use(express.json())
router.use(express.urlencoded({extended:true}))

router.get('/', getAllProducts)

router.get('/:productId',adminChecker, getProductById)

router.post('/',adminChecker,saveNewProduct)

router.put('/:productId',adminChecker, updateProduct)

router.delete('/:productId',adminChecker, deleteProduct)

module.exports = router;