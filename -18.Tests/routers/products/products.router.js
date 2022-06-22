const express = require('express')


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

router.get('/:productId', getProductById)

router.post('/',saveNewProduct)

router.put('/:productId', updateProduct)

router.delete('/:productId', deleteProduct)

module.exports = router;