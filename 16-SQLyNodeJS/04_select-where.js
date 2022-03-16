const dbConfig = require('./db/config.js')
const knex = require('knex')(dbConfig.mariaDB)

async function createTable(){
    try{
        const data = await knex.from('user')
            .select('*')
            .where('age', '>', 32);

        const dataa = await knex.from('user')
            .select('*')
            .where('name', 'like', 'J%')
            .andWhere('age','<',30);

        console.table(dataa)
    }
    catch(error){
        console.log(error);
        throw error;
    }
    finally{
        knex.destroy();
    }
}

createTable();