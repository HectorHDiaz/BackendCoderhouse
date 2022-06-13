const { apiFailedResponse } = require('../utils/api.utils');

const errorMiddleware = (error, req, res, next) => {
  console.log(error);
  const status = error.status || 500;
  const errorItem = {
    message: error.message,
    details: error.details
  };
  const errorResponse = apiFailedResponse(errorItem, status);
  return res.status(status).json(errorResponse);
};

module.exports = errorMiddleware;