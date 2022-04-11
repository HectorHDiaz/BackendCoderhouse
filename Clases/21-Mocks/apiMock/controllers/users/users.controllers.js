const MockApi = require('../../models/apis/MockApi');

const usersApi = new MockApi('user');

const getUsersController = (req, res, next) => {
  try {
    res.json(usersApi.getAll());
  }
  catch(error) {
    next(error.message);
  }
}

const getUserByIdController = (req, res, next) => {
  try {
    const { id } = req.params;
    res.json(usersApi.getById(id));
  }
  catch(error) {
    next(error.message);
  }
}

const saveUserController = (req, res, next) => {
  try {
    const userItem = req.body;
    res.json(usersApi.save(userItem))
  }
  catch(error) {
    next(error.message);
  }
}

const updateUseController = (req, res, next) => {
  try {
    const { id } = req.params;
    const userItem = req.body;
    res.json(usersApi.update(id, userItem));
  }
  catch(error) {
    next(error.message);
  }
}

const deleteUserController = (req, res, next) => {
  try {
    const { id } = req.params;
    res.json(usersApi.delete(id));
  }
  catch(error) {
    next(error.message);
  }
};

const populateUsersController = (req, res, next) => {
  try {
    const { qty } = req.query;
    res.json(usersApi.populate(qty));
  }
  catch(error) {
    next(error.message);
  }
}

module.exports = {
  getUsersController,
  getUserByIdController,
  saveUserController,
  updateUseController,
  deleteUserController,
  populateUsersController,
}