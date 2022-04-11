const { ENV: { PERS } } = require('../../config');

let ProductsDao;
let CartsDao;

switch(PERS) {
  case 'firebase':
    ProductsDao = require('./products/FirebaseProductsDao');
    CartsDao = require('./carts/FirebaseCartsDao');
    break;
  case 'mongo':
    ProductsDao = require('./products/MongoProductsDao');
    CartsDao = require('./carts/MongoCartsDao');
    break;
  case 'mariadb':
    break;
  case 'sqlite':
    break;
  case 'file':
    break;
  case 'memory':
    break;
  default:
    throw new Error('Invalid persistent method');
}

module.exports = {
  ProductsDao,
  CartsDao,
}