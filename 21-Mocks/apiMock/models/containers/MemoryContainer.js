const { v4: uuid } = require('uuid');

class MemoryContainer {
  constructor(resource) {
    this.items = [];
    this.resource = resource;
  }

  getAll() {
    return [...this.items];
  }

  getById(id) {
    const item = this.items.find(item => item.id === id);
    if (!item) {
      throw new Error(`[NOT FOUND] ${this.resource} with id ${id} does not exist in our records`)
    }
    return item;
  }

  save(item) {
    const newItem = {
      id: uuid(),
      ...item
    }
    this.items.push(newItem);
    return newItem;
  }

  update(id, item) {
    const index = this.items.findIndex(item => item.id === id);
    if (index < 0) {
      throw new Error(`[NOT FOUND] ${this.resource} with id ${id} does not exist in our records`)
    }
    this.items[index] = item;
    return item;
  }

  delete(id) {
    const index = this.items.findIndex(item => item.id === id);
    if (index < 0) {
      throw new Error(`[NOT FOUND] ${this.resource} with id ${id} does not exist in our records`)
    }
    return this.items.splice(index, 1);
  }
}

module.exports = MemoryContainer;