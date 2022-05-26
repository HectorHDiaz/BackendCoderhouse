const {CartsDao} = require('../models/daos/indexApi')
//const  CartsDao  = require('../models/daos/cart/CartDaoMongoDB')
const {productsApi} = require('./products.controller')
const mongoose = require('mongoose')

const cartApi = new CartsDao()

const postNewCart =async (req,res)=>{
    try {
        const totalCarts = await cartApi.getAll()
            const newCart = {
            id: totalCarts.length + 1,
            timestamp : Date.now(),
            products:[],
        }
        const newMongoCart = await cartApi.save(newCart)
        console.log(JSON.stringify(newMongoCart, null, 2))
        return newMongoCart._id
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
        const cartId = mongoose.Types.ObjectId(req.params.cartId);
        const productId = mongoose.Types.ObjectId(req.params.productId);
        // const allProducts = await productsApi.getAll();
        // const theProduct = allProducts.find(product => product._id === productId);
        const theProduct = await productsApi.getById(productId)
        // console.log(productId);
        // console.log(allProducts[0]._id);
        //console.log(theProduct)
        
        const theCart = await cartApi.getById(cartId);
        theCart.products.push(theProduct);
        console.log(theCart)
    
        await cartApi.updateById(cartId, theCart);
        
        return res.json({response:`Se agregó el producto al carro.`});
    } catch (error) {
        return res.json({Error: `No se pudo realizar esta acción`, error});
    }
}
const deleteProductCart = async(req,res)=>{
    try {
        const cartId = mongoose.Types.ObjectId(req.params.cartId);
        const productId = mongoose.Types.ObjectId(req.params.productId);
        const theCart = await cartApi.getById(cartId);
        const index = theCart.products.findIndex(product => product._id === productId);
        theCart.products.splice(index, 1)
        
        await cartApi.updateById(cartId, theCart);
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