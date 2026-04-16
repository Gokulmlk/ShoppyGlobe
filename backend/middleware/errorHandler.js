/**
 * Global Error Handler Middleware
 * Handles all errors and sends formatted response
 */
const errorHandler = (err, req, res, next) => {
  let error = { ...err, message: err.message };

  // Log error for debugging
  console.error(err);

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    error = { message: 'Resource not found', statusCode: 404 };
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    error = { message: 'Duplicate field value entered', statusCode: 400 };
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    error = { message, statusCode: 400 };
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error',
  });
};

export default errorHandler;
