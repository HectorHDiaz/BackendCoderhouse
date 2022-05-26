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
    productsApi.save(newProduct)
    return res.json({response: `Se agregó el nuevo Producto: ${newProduct.id}`})
};
 const updateProduct = (req,res)=>{
    const {productId} = req.params
    const {name,desc,price,image,stock} = req.body
    const newProduct = {name,desc,price,image,stock}

    if (!name || !desc || !image || !price || !stock) return res.json({ error: 'Todos los campos son obligatorios!' });

    const updatedProduct = productsApi.updateById(productId, newProduct)
    return res.json({response: `Se actualizó el Producto: ${productId}`})
}
const deleteProduct = (req,res)=>{
    const {productId} = req.params
    const deletedProduct = productsApi.deleteById(productId)
    if (deletedProduct.error) return res.status(404).send(deletedProduct.error);
  return res.json({response: `Se eliminó el Producto: ${productId}`});
};

module.exports = {
    productsApi, 
    getAllProducts,
    getProductById,
    saveNewProduct,
    updateProduct,
    deleteProduct,
}