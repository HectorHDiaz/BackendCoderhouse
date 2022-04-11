const dbConfig = require('./db/config.js')
const knex = require('knex')(dbConfig.mariaDB)

async function createTable(){
    try{
        await knex.schema.createTable('user', (table)=>{
            table.increments('id');
            table.string('name').notNullable().defaultTo('fulano');
            table.string('lastname').notNullable().defaultTo('fulano');
            table.integer('age').unsigned();
            table.string('id_nombre').notNullable().unique();
        });
        console.log('Tabla creada!')
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