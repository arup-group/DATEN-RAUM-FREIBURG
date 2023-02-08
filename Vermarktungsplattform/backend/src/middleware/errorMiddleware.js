

/**
 *  Error middlware handler
 */
const errorHandler = (err, req, res, next) => {
  //response status code
  const statusCode = res.statusCode ? res.statusCode : 500;

  // catch status code 200
  if (statusCode === 200) {
    res.status(500);
  } else {
    res.status(statusCode);
  }

  const message = err.message ? err.message : "Something went wrong";
  const stack = process.env.NODE_ENV === "production" ? "" : err.stack;

  //logging
  console.error(err.stack);

  //return response
  res.json({
    message: message,
    stack: stack,
  });
};

// Issue is trying to access the req object
const sqlErrorHandler = (err, statusCode, req, res, next) => {
  const message = err ? err : "Something went wrong";
  const stack = process.env.NODE_ENV === "production" ? "" : err.stack;

  //logging
  console.error(err);

  //return response
  res.status(statusCode);
  res.json({
    message: message,
    stack: stack,
  });
};

module.exports = { errorHandler, sqlErrorHandler };
