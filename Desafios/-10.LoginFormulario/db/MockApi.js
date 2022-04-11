const faker = require('faker');

faker.locale = 'es';

createUserItem = () => {
  return {
    name:       faker.vehicle.vehicle(),
    price:      faker.commerce.price(100, 200, 0, '$'),
    image:      faker.image.transport(),
    desc:       faker.lorem.paragraphs(),
    stock:      faker.datatype.number({ min: 10, max: 100}),
    id:         faker.datatype.uuid(),
    code:       this.id,
    timestamp:  Date.now(),
  }
}

const getMockedItems = (qty) => {
  const mockedItems = [];
  for (let i = 1; i <= +qty; i++) {
    const newItem = createUserItem()
    mockedItems.push(newItem);
  }
  return mockedItems;
}

  
module.exports = {getMockedItems};