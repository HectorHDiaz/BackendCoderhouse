const dbConfig = require('./db/config.js')
const knex = require('knex')(dbConfig.mariaDB)

const singleUser= {
    name: 'Jorge',
    lastname: 'Malo',
    age: 29,
    id_nombre: '987654321'
}

const multipleUsers= [
    { name: 'Luis', lastname: 'Diaz', age: 25, id_nombre: '123crack456' },
    { name: 'Joseph', lastname: 'Tribbiani', age: 30, id_nombre: '123joey456' },
    { name: 'Chandler', lastname: 'Bing', age: 31, id_nombre: '123bing456' },];


async function insertIntoTable(){
    try{
        await knex('user').insert(multipleUsers)
        console.log('Data Inserted')
    }
    catch(error){
        console.log(error);
        throw error;
    }
    finally{
        knex.destroy();
    }
}

insertIntoTable();