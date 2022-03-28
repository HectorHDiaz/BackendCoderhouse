const fs = require('fs/promises');

class Contenedor{
    constructor(fileName){
        this.filePath = fileName;
        this.data = this.readFile();
    }

    async readFile(){
        try {
            const readenFile = await fs.readFile(this.filePath, 'utf-8');
            if(readenFile == ''){
                return []
            }else{
                return JSON.parse(readenFile)
            }
        } catch (err){
            console.error(err.message)
            return []
        }
    }

    async writeAllFile(array){
        await fs.writeFile(this.filePath, JSON.stringify(array, null, 3))
        this.data = this.readFile();
    }

    async writeFile(obj){
        const fileContent = await this.data
        fileContent.push(obj)
        await fs.writeFile(this.filePath, JSON.stringify(fileContent, null, 3))
    }

    async deleteAll(){
        try{
            let newContent = []
            await fs.writeFile(this.filePath, newContent)
            this.data = newContent
        }catch{
            return {Error: "En el borrado Total de Archivo"}
        }
    }
}

module.exports = Contenedor 