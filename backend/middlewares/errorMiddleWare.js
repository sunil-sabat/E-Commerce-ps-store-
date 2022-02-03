const notFound = (req, res, next) => {
  console.log(req);
  const error = new Error(`not found-${req.originalurl}`);

  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.status === 200 ? 500 : res.statusCode;

  res.status(statusCode);
  console.log(err.message, err.stack);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export { notFound, errorHandler };
