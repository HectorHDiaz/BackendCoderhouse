const dbConfig = require('./db/config.js')
const knex = require('knex')(dbConfig.mariaDB)

async function selectFromTable(){
    try{
        const users = await knex.from('user').select('*').orderBy('age', 'desc');
        console.table(users)
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