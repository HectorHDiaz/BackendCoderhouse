const MessagesMongoDAO = require('./messages.mongo.dao');

class MessagesDAOSFactory {
  static getDAOS(type) {
    let messageDAO;
    switch(type.toLowerCase()) {
      case 'mongo':
        messageDAO = new MessagesMongoDAO('messages');
        break;
      default:
        throw new Error('Invalid data source, please provide one of the following (MONGO)')
    }
    return {
      messageDAO,
    }
  }
}

module.exports = MessagesDAOSFactory;