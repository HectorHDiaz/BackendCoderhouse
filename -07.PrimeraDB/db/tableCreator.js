async function createTable(dbConfig, table){
    const knex = require('knex')(dbConfig)
    try{
        console.log(table)
        const tableExist = await knex.schema.hasTable(table);
        if(!tableExist){   
            switch(table){
                case 'messages':{
                    console.log(1)
                    await knex.schema.createTable('messages', (table)=>{
                        table.string('id').notNullable().defaultTo('fulano');
                        table.string('email').notNullable().defaultTo('fulano');
                        table.string('text').notNullable().defaultTo('fulano');
                        table.string('time').notNullable().defaultTo('fulano');
                    });
                    console.log('Tabla messages creada!')
                    break;} 

                case 'products':{
                    await knex.schema.createTable('products', (table)=>{
                        table.increments('id');
                        table.string('name').notNullable().defaultTo('fulano');
                        table.integer('price').notNullable();
                        table.string('image').notNullable();
                    });
                    console.log('Tabla Products creada!')
                    break;}

                default:
                    console.log('Creación de Tabla no permitida!')
                    break;
            }
        }else{
            console.log(`Tabla: ${table} ya existe!`)
        }
    }
    catch(error){
        console.log(error);
        throw error;
    }
    finally{
        knex.destroy();
    }
}

module.exports = {createTable}
