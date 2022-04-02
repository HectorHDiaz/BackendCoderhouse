const MemoryContainer = require("../containers/MemoryContainer");
const { createUserItem } = require('../../utils/index');

class MockApi extends MemoryContainer {
  constructor(resource) {
    super(resource);
  } 

  populate(qty = 50) {
    const mockedItems = [];
    for (let i = 1; i <= +qty; i++) {
      const newItem = this.createItem(this.resource);
      const savedItem = this.save(newItem);
      mockedItems.push(savedItem);
    }
    return mockedItems;
  }

  createItem(resource) {
    const newItems = {
      user: createUserItem(),
    }
    return newItems[resource];
  }
}

module.exports = MockApi;