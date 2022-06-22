const {ProductsDao} = require('../models/daos/indexApi')
//const ProductsDao = require('../models/daos/products/ProductsDaoMongoDB')

const productsApi = new ProductsDao()

const getAllProducts = async(req,res)=>{
    const allProducts = await productsApi.getAll()
    return res.json(allProducts)
};
const getProductById = async(req,res)=>{
    const { productId } = req.params
    const searchedProduct = await productsApi.getById(productId)
    return res.json(searchedProduct);
};
const saveNewProduct = async(req,res)=>{
    const idCount = await productsApi.getAll()
    const { name, desc, image, price, stock} = req.body;
    if (!name || !desc || !image || !price || !stock ) return { error: 'Todos los campos son obligatorios!' };
    const newProduct = { 
        id: idCount.length +1,
        code: idCount.length +1,
        timestamp: Date.now(),
        name, desc, image, price, stock
    };
    const newSavedProduct = await productsApi.save(newProduct)
    return res.json(newSavedProduct)
};
 const updateProduct = async (req,res)=>{
    const {productId} = req.params
    const {name,desc,price,image,stock} = req.body
    const newProduct = {name,desc,price,image,stock}

    if (!name || !desc || !image || !price || !stock) return res.json({ error: 'Todos los campos son obligatorios!' });

    const updatedProduct = await productsApi.updateById(productId, newProduct)
    return res.json(updatedProduct)
}
const deleteProduct = (req,res)=>{
    const {productId} = req.params
    const deletedProduct = productsApi.deleteById(productId)
    if (deletedProduct.error) return res.status(404).send(deletedProduct.error);
  return res.json(productId);
};

module.exports = {
    productsApi, 
    getAllProducts,
    getProductById,
    saveNewProduct,
    updateProduct,
    deleteProduct,
}