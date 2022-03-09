const { ProductsApi } = require('../models/indexApi')

const productsApi = new ProductsApi()



const getAllProducts = (req,res)=>{
    return res.json(productsApi.getAll())
};

const getProductById = (req,res)=>{
    const { productId } = req.params
    const searchedProduct = productsApi.getById(productId)
    return res.json({ resultado: true, result: searchedProduct });
};

const saveNewProduct = (req,res)=>{
    const newProduct = productsApi.saveNew(req.body)
    return res.json(newProduct)
};

const updateProduct = (req,res)=>{
    const {productId} = req.params
    const updatedProduct = productsApi.updateById(req.body, productId)
    if(updatedProduct.error) return res.status(404).send(updatedProduct.error);
    return res.json({Exito: true, ProductoCambiado: updatedProduct})
}
const deleteProduct = (req,res)=>{
    const {productId} = req.params
    const deletedProduct = productsApi.deleteById(productId)
    if (deletedProduct.error) return res.status(404).send(deletedProduct.error);
  return res.json(deletedProduct);
};

module.exports = {
    productsApi,
    getAllProducts,
    getProductById,
    saveNewProduct,
    updateProduct,
    deleteProduct,
}