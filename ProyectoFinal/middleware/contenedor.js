const fs = require('fs/promises');

class Contenedor{
    constructor(fileName){
        this.filePath = fileName;
        this.data = this.readFile();
    }

    async readFile(){
        try {
            const readenFile = await fs.readFile(this.filePath, 'utf-8');
            return JSON.parse(readenFile)
        } catch (err){
            console.error(err.message)
            return []
        }
    }

    async writeFile(obj){
        const fileContent = await this.data 
        fileContent.push(obj)
        await fs.writeFile(this.filePath, JSON.stringify(fileContent, null, 3))
    }

    async deleteAll(){
        let newContent =[]
        await fs.writeFile(this.filePath, newContent)
    }
}

module.exports = Contenedor 