const ContenedorFirebase = require('../../contenedores/contenedorFirebase');

class ProductsDaoFirebase extends ContenedorFirebase {
  constructor() {
    super('carts');
  }
}

module.exports = ProductsDaoFirebase;