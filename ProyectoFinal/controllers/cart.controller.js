const { CartApi } = require('../models/indexApi')

const cart = new CartApi()

const postNewCart = (req,res)=>{
    
}
const deleteCart = (req,res,cartId)=>{

}
const getCartProducts = (req,res,cartId)=>{

}
const postNewProduct = (req,res,cartId, productId)=>{

}
const deleteProductCart = (req,res,cartId, productId)=>{

}

module.exports = {
    postNewCart,
    deleteCart,
    getCartProducts,
    postNewProduct,
    deleteProductCart
}