const { ProductsDao } = require('../models/daos/index');

const productsDao = new ProductsDao();

const getAllProducts = async (req, res, next) => {
  try {
    const products = await productsDao.getAll();
    res.json({ success: true, products });
  }
  catch(error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await productsDao.getById(id);
    res.json({ success: true, product });
  }
  catch(error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const newProduct = await productsDao.save(req.body);
    res.json({ success: true, result: newProduct });
  }
  catch(error) {
    next(error);
  }
};

const updateProductById = async (req, res, next) => {
  const { params: { id }, body } = req;
  try {
    const updatedProduct = await productsDao.updateById(id, body);
    res.json({ success: true, result: updatedProduct });
  }
  catch(error) {
    next(error);
  }
};

const deleteProductById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedProduct = await productsDao.deleteById(id);
    res.json({ success: true, result: deletedProduct });
  }
  catch(error) {
    next(error);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProductById,
  deleteProductById,
}