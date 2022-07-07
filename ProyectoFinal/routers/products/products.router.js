const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql');

const productSchema = require('../graphql/products.graphql.schema')
const ProductsController= require('../../controllers/products.controller')

const router = express.Router()
const schema = buildSchema(productSchema)
const productsController = new ProductsController()

router.use(express.json())
router.use(express.urlencoded({extended:true}))
// //GraphQL middleware
// router.use('/graphql', graphqlHTTP({
//     schema,
//     rootValue:{
//         getAllProducts,
//         getProductById,
//         saveNewProduct,
//         updateProduct,
//         deleteProduct
//     },
//     graphiql: true
// }))

router.get('/', async (req, res)=>{
    res.json( await productsController.getAllProducts())
})

router.get('/:productId', async (req, res)=>{
    res.json( await productsController.getProductById())
})

router.post('/',async (req, res)=>{
    res.json( await productsController.saveNewProduct())
})

router.put('/:productId', async (req, res)=>{
    res.json( await productsController.updateProduct())
})

router.delete('/:productId', async (req, res)=>{
    res.json( await productsController.deleteProduct())
})

module.exports = router;