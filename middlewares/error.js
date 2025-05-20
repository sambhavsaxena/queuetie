const not_found = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const error_handler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res
    .json({
      message: err.message,
      stack: process.env.NODE_ENV === "production" ? null : err.stack,
    })
    .status(statusCode);
};

export { not_found, error_handler };
