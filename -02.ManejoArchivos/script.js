const fs = require('fs/promises');

class Contenedor{
    constructor(fileName){
        this.fileName = fileName;
        this.filePath = `./${this.fileName}`;
        this.data = (async ()=>{
            try {
                const readenFile= await fs.readFile(this.filePath, 'utf-8');
                return JSON.parse(readenFile)
            } catch (err){
                console.error(err.message)
                return []
            }
        })();
    }
    async write(data){
        try {
            await fs.writeFile(this.filePath, JSON.stringify(data, null, 3))
        } catch (error) {
            
        }
    }
    
    async save(obj){
        const fileContent = await this.data
        let newId = fileContent.length+1
        let newObj = {id: newId, ...obj}
        fileContent.push(newObj)
        await this.write(fileContent)
        console.log(newObj.id)
    }

    async getById(id){
        try {
            const fileContent = await this.data
            const theItem = fileContent.find(item => item.id === id);
            console.log(theItem)
        } catch (error) {
            console.log("Hubo un error al traer el objeto" + error)
        }
    }
    async getAll(){
        const fileContent = await this.data
        console.log(fileContent)
    }
    async deleteById(id){
        const fileContent = await this.data
        let notDeleted = fileContent.filter(item => item.id !== id)
        await this.write(notDeleted)
    }
    async deleteAll(){
        let newContent = []
        await this.write(newContent)
    }
}
const productos = new Contenedor("productos.txt")
productos.save({
    title:"teclado",
    price:5000,
    thumbnail:"https://i.imgur.com/GtoWYAv.jpeg",
})
productos.save({
    title:"mouse",
    price:3000,
    thumbnail:"https://i.imgur.com/YDFVzo7.jpeg",
})
productos.save({
    title:"monitor",
    price:10000,
    thumbnail:"https://i.imgur.com/09QTNxn.jpeg",
})
productos.getById(3)
productos.getAll()
productos.deleteById(3)
productos.deleteAll()