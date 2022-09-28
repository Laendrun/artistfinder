function validationError(error, res, next) {
  res.status(400);
  const err = new Error(error);
  next(err);
}

module.exports = {
  validationError,
}