const ProductsDao = require('../../models/daos/productsDao')

const productsDao = new ProductsDao();

async function addProducts(socket, sockets){
    const allProducts = await productsDao.getAll()
    socket.emit('allProducts', allProducts)

    socket.on('new-product', async newItem=>{
        
        const newProduct = {
            ...newItem,
            id:allProducts.length+1,
            code:allProducts.length+1,
        };
        await productsDao.createItem(newProduct)
        const products = await productsDao.getAll()
        sockets.emit('render-new-product', products)
    })
}

module.exports = addProducts