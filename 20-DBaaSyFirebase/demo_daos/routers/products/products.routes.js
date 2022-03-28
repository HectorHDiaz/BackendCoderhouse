const { Router } = require('express');
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProductById,
  deleteProductById,
} = require('../../controllers/products.controllers');

const router = Router();

router.get('/', getAllProducts);

router.get('/:id', getProductById);

router.post('/', createProduct);

router.put('/', updateProductById);

router.delete('/', deleteProductById);

module.exports = router;