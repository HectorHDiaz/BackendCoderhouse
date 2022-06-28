const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql');

const productSchema = require('../../models/graphql/products.graphql.schema')
const {
    getAllProducts,
    getProductById,
    saveNewProduct,
    updateProduct,
    deleteProduct,
} = require('../../controllers/products.controller')

const router = express.Router()
const schema = buildSchema(productSchema)

router.use(express.json())
router.use(express.urlencoded({extended:true}))
router.use('/graphql', graphqlHTTP({
    schema,
    rootValue:{
        getAllProducts,
        getProductById,
        saveNewProduct,
        updateProduct,
        deleteProduct
    },
    graphiql: true
}))

router.get('/', async (req, res)=>{
    res.json( await getAllProducts())
})

router.get('/:productId', async (req, res)=>{
    res.json( await getProductById())
})

router.post('/',async (req, res)=>{
    res.json( await saveNewProduct())
})

router.put('/:productId', async (req, res)=>{
    res.json( await updateProduct())
})

router.delete('/:productId', async (req, res)=>{
    res.json( await deleteProduct())
})

module.exports = router;