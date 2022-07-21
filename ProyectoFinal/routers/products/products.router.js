const express = require('express')

const ProductsController= require('../../controllers/products.controller')

const router = express.Router()
const productsController = new ProductsController()

router.use(express.json())
router.use(express.urlencoded({extended:true}))


router.get('/', async (req, res)=>{
    res.json( await productsController.getAllProducts())
})

router.get('/:productId', async (req, res)=>{
    res.json( await productsController.getProductById(req))
})

router.post('/',async (req, res)=>{
    res.json( await productsController.saveNewProduct(req))
})

router.put('/:productId', async (req, res)=>{
    res.json( await productsController.updateProduct(req))
})

router.delete('/:productId', async (req, res)=>{
    res.json( await productsController.deleteProduct(req))
})

module.exports = router;