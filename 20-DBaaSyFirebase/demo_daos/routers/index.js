const { Router } = require('express');
const productsRoutes = require('./products/products.routes');
// const cartsRoutes = require('./carts/carts.routes');

const router = Router();

router.use('/products', productsRoutes);
// router.use('/carts', cartsRoutes);

module.exports = router;