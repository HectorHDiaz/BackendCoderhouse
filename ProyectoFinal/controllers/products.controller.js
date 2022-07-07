const ProductsService = require('../services/product.services')

class ProductsController{
    constructor(){
        this.productsService = new ProductsService()
    }
    getAllProducts = async(req,res)=>{
        const allProducts = await this.productsService.getAllProductsService()
        return allProducts
    };
    getProductById = async(req,res)=>{
        const { productId } = req.params
        const searchedProduct = await this.productsService.getProductByIdService(productId)
        return res.json(searchedProduct);
    };
    saveNewProduct = async(req,res)=>{
        const { name, desc, image, price, stock} = req.body;
        if (!name || !desc || !image || !price || !stock ) return res.json({ error: 'Todos los campos son obligatorios!' });
        const newProduct = {
            name: req.body.name, 
            desc: req.body.desc, 
            image: req.body.image, 
            price: req.body.price, 
            stock: req.body.stock
        }
        const savedProduct = await this.productsService.createProductService(newProduct)
        return savedProduct
    };
    updateProduct = async (req,res)=>{
        const {productId} = req.params
        const {name,desc,price,image,stock} = req.body
        const newProduct = {name,desc,price,image,stock}
        if (!name || !desc || !image || !price || !stock) return res.json({ error: 'Todos los campos son obligatorios!' });

        const updatedProduct = await this.productsService.updateProductService(productId, newProduct)
        return updatedProduct
    }
    deleteProduct = (req,res)=>{
        const {productId} = req.params
        const deletedProduct = this.productsService.deleteProduct(productId)
        if (deletedProduct.error) return res.status(404).send(deletedProduct.error);
    return productId;
    }
}

module.exports = ProductsController