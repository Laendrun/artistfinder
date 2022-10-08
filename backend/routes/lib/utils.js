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

function getError(res, next) {
  res.status(500);
  const err = new Error('Unable to get data from the database.');
  next(err);
}

function putError(res, next) {
  res.status(500);
  const err = new Error('Unable to update data in the database.');
  next(err);
}

function postError(res, next) {
  res.status(500);
  const err = new Error('Unable to insert data in the database.');
  next(err);
}

function deleteError(res, next) {
  res.status(500);
  const err = new Error('Unable to delete data from the database.');
  next(err);
}

function logDBError(error) {
  console.error(new Date());
  console.error(error.code);
  console.error(error.message);
  console.error(error.sql);
}

module.exports = {
  validationError,
  unauthorized,
  getError,
  putError,
  postError,
  deleteError,
  logDBError,
}