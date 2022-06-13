class MessageDTO {
    constructor(messageItem, _id) {
      Object.assign(this, productItem);
      this.createdAt = messageItem.createdAt || Date.now();
      this.updatedAt = Date.now();
      if (_id) {
        this._id = _id;
      }
    }
  };
  
  module.exports = MessageDTO;