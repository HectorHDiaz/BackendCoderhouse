const { ProductsApi } = require('../models/indexApi')

const products = new ProductsApi()



const getAllProducts = (req,res)=>{
    return res.json(products.getAll())
};

const getProductById = (req,res)=>{
    const { productId } = req.params
    const searchedProduct = products.getById(productId)
    return res.json({ resultado: true, result: searchedProduct });
};

const saveNewProduct = (req,res)=>{
    const newProduct = products.saveNew(req.body)
    return res.json(newProduct)
};

const updateProduct = (req,res)=>{
    const {productId} = req.params
    const updatedProduct = products.updateById(req.body, productId)
    if(updatedProduct.error) return res.status(404).send(updatedProduct.error);
    return res.json({Exito: true, ProductoCambiado: updatedProduct})
}
const deleteProduct = (req,res)=>{
    const {productId} = req.params
    const deletedProduct = products.deleteById(productId)
    if (deletedProduct.error) return res.status(404).send(deletedProduct.error);
  return res.json(deletedProduct);
};

module.exports = {
    getAllProducts,
    getProductById,
    saveNewProduct,
    updateProduct,
    deleteProduct,
}