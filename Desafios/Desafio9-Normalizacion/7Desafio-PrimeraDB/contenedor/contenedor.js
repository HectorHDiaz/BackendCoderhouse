const {createTable} = require('../db/tableCreator')

class Contenedor{
    constructor(configDB, table){
        this.knex = require('knex')(configDB)
        this.configDB = configDB
        this.table = table
    }
    
    async readFile(){
        try{ 
            const data = this.knex.from(this.table).select('*');
            return data
        } 
        catch(error){
            console.log(error);
            throw error;
        }  
    }

    async writeFile(obj){
        try{
            await this.knex(this.table).insert(obj)
            return {Message: 'Data inserted'}
        }
        catch(error){
            console.log(error);
            throw error;
        }
    }

    async deleteAll(){
        try{
            await this.knex.from(this.table).del();
            return {message: 'Datos borrados'}
        }
        catch(error){
            console.log(error);
            throw error;
        }
    }
}

module.exports = Contenedor 