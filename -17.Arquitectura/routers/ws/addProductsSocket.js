const ProductsController = require('../../controllers/product.controller')

const Products = new ProductsController();

async function addProducts(socket, sockets){
    const allProducts = await Products.getAllProductsController()
    socket.emit('allProducts', allProducts)

    socket.on('new-product', async newItem=>{
        
        const newProduct = {
            ...newItem,
            id:allProducts.length+1,
            code:allProducts.length+1,
        };
        await Products.createProductController(newProduct)
        const newProducts = await Products.getAllProductsController()
        sockets.emit('render-new-product', newProducts)
    })
}

module.exports = addProducts