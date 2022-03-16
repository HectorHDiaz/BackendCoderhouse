const dbConfig = require('./db/config.js')
const knex = require('knex')(dbConfig.mariaDB)

async function selectFromTable(){
    try{
        await knex.from('user').where({name:'User Generico'}).del();
        console.table('Todos borrados!')
    }
    catch(error){
        console.log(error);
        throw error;
    }
    finally{
        knex.destroy();
    }
}

selectFromTable();