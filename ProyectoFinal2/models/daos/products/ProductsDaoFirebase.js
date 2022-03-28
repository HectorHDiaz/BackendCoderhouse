const ContenedorFirebase = require('../../contenedores/contenedorFirebase');

class ProductsDaoFirebase extends ContenedorFirebase {
  constructor() {
    super('products');

  }
}

module.exports = ProductsDaoFirebase;