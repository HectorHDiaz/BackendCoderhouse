class UserDTO {
    constructor(userItem, _id) {
      Object.assign(this, userItem);
      this.createdAt = userItem.createdAt || Date.now();
      this.updatedAt = Date.now();
      if (_id) {
        this._id = _id;
      }
    }
  };
  
  module.exports = UserDTO;