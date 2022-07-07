class CustomError {
  constructor(statusCode, description, errorDetails) {
   this.status = statusCode;
   this.message = description;
   this.details = errorDetails; 
  }
};

module.exports = CustomError;