const Contenedor = require('../../contenedores/contenedorFileSystem.js')
const path = require('path')

const dataPath= path.resolve(__dirname,"./data.txt")
const contenedor = new Contenedor(dataPath)

class ProductsApi{
    constructor(){
        this.products = (contenedor.data).then((res)=> {this.products = res})
    }
    getAll(){
        return this.products;
    };

    getById(id){
        const product = this.products.find(prod => prod.id === +id);
        return product || { error: `el producto ${id} no fué encontrado!` };
    };

    saveNew(product){
        let idCount = [...this.products].length
        const { name, desc, image, price} = product;
        if (!name || !desc || !image || !price ) return { error: 'Todos los campos son obligatorios!' };
        const newProduct = { 
            id: idCount +1,
            code: idCount+1,
            timestamp: Date.now(),
            ...product
        };
        contenedor.writeFile(newProduct)

        return newProduct;
    };

    async updateById(newInfo, id){
        const newList = [...this.products]
        const index = this.products.findIndex(product => product.id === +id);
        if (index < 0) return { error: `No se encontró un Producto con el id: ${id}!`};
        newList[index] = { 
            id: +id,
            code: +id,
            timestamp: Date.now(),
            ...newInfo
        };
        
        await contenedor.writeAllFile(newList)

        this.products = (contenedor.data).then((res)=> {this.products = res})

        return newList[index]
    };
    deleteById(id){
        const index = this.products.findIndex(product => product.id === +id);
        if (index < 0) return { error: `No se encontró un Producto con el id: ${id}!`};
        const newList = this.products.splice(index, 1)
        contenedor.writeAllFile(newList)
        return newList
    };
}

module.exports = ProductsApi;