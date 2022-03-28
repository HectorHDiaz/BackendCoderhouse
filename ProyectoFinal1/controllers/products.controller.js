const { ProductsApi } = require('../models/indexApi')

const productsApi = new ProductsApi()


const getAllProducts = (req,res)=>{
    return res.json(productsApi.getAll())
};

const getProductById = (req,res)=>{
    const { productId } = req.params
    const searchedProduct = productsApi.getById(productId)
    return res.json({result: searchedProduct });
};

const saveNewProduct = (req,res)=>{
    const newProduct = productsApi.saveNew(req.body)
    return res.json({Nuevo: newProduct})
};

 const updateProduct = (req,res)=>{
    const {productId} = req.params
    const {name,desc,price,image} = req.body
    const newProduct = {name,desc,price,image}

    if (!name || !desc || !image || !price ) return { error: 'Todos los campos son obligatorios!' };
    const updatedProduct = productsApi.updateById(newProduct, productId)
    return res.json({Nuevo:updatedProduct.name})
}
const deleteProduct = (req,res)=>{
    const {productId} = req.params
    const deletedProduct = productsApi.deleteById(productId)
    if (deletedProduct.error) return res.status(404).send(deletedProduct.error);
  return res.json({Eliminado:deletedProduct});
};

module.exports = {
    productsApi,
    getAllProducts,
    getProductById,
    saveNewProduct,
    updateProduct,
    deleteProduct,
}