// src/utils/appError.js

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }

  // Helper method to format the error to your exact response specification
  toResponseFormat() {
    return {
      status: this.status,     // 1st: 'fail' or 'error'
      message: this.message,   // 2nd: The error message string
      data: null               // 3rd: Explicitly null on failure
    };
  }
}

module.exports = AppError;