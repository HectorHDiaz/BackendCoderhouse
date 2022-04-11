const faker = require('faker');

faker.locale = 'es';

const createUserItem = () => {
  return {
    nombre: faker.name.firstName(),
    email: faker.internet.email(),
    website: faker.internet.url(),
    image: faker.image.avatar()
  }
};

module.exports = {
  createUserItem
}