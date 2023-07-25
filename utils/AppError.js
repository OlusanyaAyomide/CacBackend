export default class AppError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
      this.status = `${String(statusCode).startsWith("4") ? "fail" : "error"}`;
      this.isOperational = true;
      this.mesage = message;
  
      Error.captureStackTrace(this, this.constructor);
    }
  }
  