const { STATUS } = require('../constants/api.constants');
const UsersDao = require('../models/daos/Users.dao');
const { formatErrorObject } = require('../utils/api.utils');
const { formatUserForDB } = require('../utils/users.utils');

const User = new UsersDao();

const register = async (req, res, next) => res.redirect('/profile');

const login = async (req, res, next) => res.redirect('/profile');

module.exports = {
  login,
  register,
}