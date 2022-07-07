//GraphQL Schema
const productSchema =`
  type Product {
    id: ID!,
    code: String,
    name: String,
    desc: String,
    image: String,
    price: Int,
    stock: Int,
    timestamp: String,
  }
  input newInfoProduct {
    name: String,
    desc: String,
    image: String,
    price: Int,
    stock: Int,
  }

  type Query {
    getAllProducts: [Product],
    getProductById(id: ID!): Product,
  }
  type Mutation {
    saveNewProduct(datos: newInfoProduct): Product,
    updateProdcut(id: ID!, datos: newInfoProduct): Product,
    deleteProduct(id:ID!): Product,
  }
`

module.exports = productSchema;