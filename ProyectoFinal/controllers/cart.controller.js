const mongodb = require('mongodb')
const CartServices = require('../services/cart.services');
const {infoLogger, errorLogger} = require('../utils/logger/index')
const {ObjectId} = mongodb

class CartController{
    constructor(){
        this.cartServices = new CartServices()
    }
    getCartById = async (id)=>{
        const theCart = await this.cartServices.getCartByIdService(id)
        return theCart;
    }
    postNewCart = async (userId)=>{
        try {
            const newCartId = await this.cartServices.createCartService(userId)
            return newCartId;
        } catch (error) {
            errorLogger.error(error);
        }
    }
    getCartProducts = async(req,res)=>{
        try {
            const cartId = req.params.cartId
            const products = await this.cartServices.getCartProductsService(cartId);
            return res.json(products)
        } catch (error) {
            errorLogger.error(error);
            return res.json({Error: `No se pudieron conseguir los productos del carro`, error})
        }
    }
    postNewProduct = async(req,res)=>{
        try {
            const cartId = ObjectId(req.params.cartId);
            const productId = ObjectId(req.params.productId);
        
            await this.cartServices.addProductToCartService(cartId, productId)
            
            return res.json({response:`Se agregó el producto al carro.`});
        } catch (error) {
            errorLogger.error(error);
            return res.json({Error: `No se pudo agregar el producto al carro`, error});
        }
    }
    deleteProductCart = async(req,res)=>{
        try {
            const cartId = ObjectId(req.params.cartId);
            const productId = ObjectId(req.params.productId); 
            await this.cartServices.removeProductToCartService(cartId, productId);

            return res.json({response:'Se eliminó el producto al carro.'})
        } catch (error) {
            errorLogger.error(error);
            return res.json({Error: `No se pudo realizar esta acción`, error})
        }
    }
    purchaseCart = async(req,res)=>{
        try {
            const cartId = ObjectId(req.params.cartId);
            await this.cartServices.purchaseCartService(cartId)
            
            return res.json({response: 'Pedido realizado. Compra en Proceso'})
        } catch (error) {
            errorLogger.error(error);
            return res.json({Error: `No se pudo realizar esta acción`, error})
        } 
    }
}

module.exports = CartController