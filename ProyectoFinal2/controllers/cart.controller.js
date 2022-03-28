const {CartsDao} = require('../models/daos/indexApi')
//const  CartsDao  = require('../models/daos/cart/CartDaoMongoDB')
const {productsApi} = require('./products.controller')

const cartApi = new CartsDao()

const postNewCart =async (req,res)=>{
    try {
        const totalCarts = await cartApi.getAll()
            const newCart = {
            id: totalCarts.length + 1,
            timestamp : Date.now(),
            products:[],
        }
        cartApi.save(newCart)
        return res.json({response: `Su nuevo carro fué creado: Id:${newCart.id}`})
    } catch (error) {
        return res.json({Error: `No se pudo realizar esta acción`, error})
    }
    
}
const deleteCart = (req,res)=>{
    try {
        const cartId = req.params.cartId
        cartApi.deleteById(cartId)
        return res.json({response:`Su carro id:${cartId} fué eliminado`})
    } catch (error) {
        return res.json({Error: `No se pudo realizar esta acción`, error})
    }
}
const getCartProducts = async(req,res)=>{
    try {
        const cartId = req.params.cartId
        const theCart = await cartApi.getById(cartId)
        //retorna un array donde tengo que especificar la posicion
        return res.json(theCart[0].products)
    } catch (error) {
        return res.json({Error: `No se pudo realizar esta acción`, error})
    }
}
const postNewProduct = async(req,res)=>{
    try {
        const cartId = req.params.cartId
        const productId = req.params.productId
        const allProducts = await productsApi.getAll()
        const theProduct = allProducts.find(product => product.id === +productId)
        const theCart = await cartApi.getById(cartId)
        theCart[0].products.push(theProduct)
    
        await cartApi.updateById(cartId, theCart[0])
        return res.json({response:'Se agregó el producto al carro.'})
    } catch (error) {
        return res.json({Error: `No se pudo realizar esta acción`, error})
    }
}
const deleteProductCart = async(req,res)=>{
    try {
        const cartId = req.params.cartId
        const productId = req.params.productId
        const theCart = await cartApi.getById(cartId)
        const index = theCart[0].products.findIndex(product => product.id === +productId);
        theCart[0].products.splice(index, 1)
        
        await cartApi.updateById(cartId,theCart[0])
        return res.json({response:'Se eliminó el producto al carro.'})
    } catch (error) {
        return res.json({Error: `No se pudo realizar esta acción`, error})
    }
}

module.exports = {
    postNewCart,
    deleteCart,
    getCartProducts,
    postNewProduct,
    deleteProductCart
}