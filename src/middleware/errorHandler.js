const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,       // 1st
    message: err.message,     // 2nd
    data: null,               // 3rd: Explicitly null on failure
    // Kept at the bottom for debugging; automatically removed in production
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

module.exports = errorHandler;