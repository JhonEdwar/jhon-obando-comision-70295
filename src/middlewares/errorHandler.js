import logger from "../config/logger";


export const errorHandler = (err, req, res, next) => {
   const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";

  logger.error(message, {
    method: req.method,
    url: req.url,
    statusCode,
    stack: err.stack,
  });

  res.status(statusCode).json({
    status: "error",
    message,
  });
};

