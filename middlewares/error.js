const not_found = (req, res, next) => {
  return res.status(404).json({
    error: `URL Not Found - ${req.originalUrl}`
  });
};

const error_handler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  return res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export { not_found, error_handler };
