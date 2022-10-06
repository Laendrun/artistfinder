function validationError(error, res, next) {
  res.status(400);
  const err = new Error(error);
  next(err);
}

function unauthorized(res, next) {
  res.status(401);
  const err = new Error('🚫 Unauthorized 🚫');
  next(err);
}

module.exports = {
  validationError,
  unauthorized,
}