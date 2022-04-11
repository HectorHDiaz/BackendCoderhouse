const express = require('express')
const createId = require('../middleware/idCreator')
const appProducts = express()
const router = express.Router()
const {products} = require('../data/data')

appProducts.use(express.static('../views'))
appProducts.use(express.json());
appProducts.use(express.urlencoded({ extended: true }));

appProducts.set('views', '../views')
appProducts.set('view engine', 'ejs')

//adding ID
router.use(createId)

router.get('/', (req,res)=>{
    res.render('products', {products})
})

router.get('/:productId', (req, res)=>{
    const { productId } = req.params
    const searchedProduct = products.find(item=>item.id === +productId)
    if (!searchedProduct) {
        return res.status(404).json({ resultado: false, error: `El producto: ${productId} no existe`});
    }else{
        return res.json({ resultado: true, result: searchedProduct });
    }
})

router.post('/' ,(req, res)=>{
    const{title,price,thumbnail}=req.body
    if(!title || !price || !thumbnail){
        return res.status(400).json({resultado:false, error:"Error en los datos"})
    }
    const newProduct={
        title,
        price,
        thumbnail,
        id :products.length + 1
    };
    products.push(newProduct);
    res.redirect('/')
})

router.put('/:productId', (req, res)=>{
const {productId} = req.params
const {title,price,thumbnail}=req.body

if(!title||!price||!thumbnail){
    return res.status(400).jason({resultado:false, error:"Error en los datos"})
}

const productIndex = products.findIndex(item => item.id === +productId)
if (productIndex < 0) {
    return res.status(404).json({ resultado: false, error: "No existe ese producto"});
}
const newProduct = {...products[productIndex], title,price,thumbnail}
products[productIndex] = newProduct;

return res.json({Exito: true, Modificado: newProduct})

})

router.delete('/:productId', (req, res)=>{
const {productId} = req.params
const productIndex = products.findIndex(item => item.id === +productId)
if (productIndex < 0) {
    return res.status(404).json({ resultado: false, error: "No existe ese producto"});
}
products.splice(productIndex,1)
return res.json({ Exito: true, Resultado: 'Elminado correctamente' });
})

module.exports = router