const PERS = require('../../config/config').DATA_SOURCE;

let ProductsDao;
let CartsDao;

switch(PERS.toLowerCase()) {
  case 'firebase':
    ProductsDao = require('./products/ProductsDaoFirebase');
    CartsDao = require('./cart/CartDaoFirebase');
    break;
  case 'mongo':
    ProductsDao = require('./products/ProductsDaoMongoDB');
    CartsDao = require('./cart/CartDaoMongoDB');
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