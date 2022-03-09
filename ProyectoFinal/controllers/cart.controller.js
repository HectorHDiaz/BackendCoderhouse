const { CartsApi } = require('../models/indexApi')
const {productsApi} = require('./products.controller')

const cartApi = new CartsApi()

const postNewCart = (req,res)=>{
    return res.json(cartApi.createCart())
}
const deleteCart = (req,res)=>{
    const cartId = req.params.cartId
    
    return res.json(cartApi.clearDelete(cartId))
}
const getCartProducts = (req,res)=>{
    const cartId = req.params.cartId
    
    return res.json(cartApi.showItems(cartId))
}
const postNewProduct = (req,res)=>{
    const cartId = req.params.cartId
    const productId = req.params.productId
    const allProducts = productsApi.products;

    const theProduct = allProducts.find(product => product.id === +productId)
    
    return res.json(cartApi.saveItem(cartId, theProduct))
}
const deleteProductCart = (req,res)=>{
    const cartId = req.params.cartId
    const productId = req.params.productId
    const allProducts = productsApi.products;
    const deletedItem = cartApi.deleteItem(cartId, productId)
    if (deletedItem.error) return res.status(404).send(deletedItem.error);

    return res.json(deletedItem)
}

module.exports = {
    postNewCart,
    deleteCart,
    getCartProducts,
    postNewProduct,
    deleteProductCart
}