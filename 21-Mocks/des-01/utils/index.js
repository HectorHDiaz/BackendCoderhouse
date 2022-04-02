const constants = require('../constants/index');

const faker = require('faker');

// const getRandomItemFromArray = (array, index) => {
//   const max = array.length;
//   const randomIndex = Math.floor(Math.random() * (max - index)) + index;
//   return array[randomIndex];
// }

const { name: nombre, commerce: comercio } = faker;


const generateArray = (num) => {
  const array = [];
  for (let i = 1; i <= num; i++) {
    array.push({
      nombre: nombre.firstName(),
      apellido: nombre.lastName(),
      color: comercio.color()
    })
  }
  return array;
};

module.exports = {
  generateArray,
}