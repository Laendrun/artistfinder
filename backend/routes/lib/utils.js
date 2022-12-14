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

function logBcryptError(error) {
  console.error(new Date());
  console.error(error);
}

function dbNotFound(res, next) {
  res.status(404);
  const err = new Error('Requested resource not found.');
  next(err);
}

function resourceUpdated(res, updateId) {
  res.status(200);
  res.json({
    message: "Resource updated.",
    id: updateId,
  });
}

function resourceCreated(res, insertId) {
  res.status(200);
  res.json({
    message: "Resource created.",
    id: insertId,
  });
}

function resourceDeleted(res, deleteId) {
  res.status(200);
  res.json({
    message: "Resource deleted.",
    id: deleteId,
  });
}

function resourceSoftDeleted(res, softDeleteId) {
  res.status(200);
  res.json({
    message: "Resource soft deleted.",
    id : softDeleteId,
  });
}

function passwordsMustMatch(res, next) {
  res.status(400);
  const err = new Error("Passwords must match.");
  next(err);
}

function usernameExists(res, next) {
  res.status(400);
  const err = new Error("Username already exists.");
  next(err);
}

function emailExists(res, next) {
  res.status(400);
  const err = new Error("Email already exists.");
  next(err);
}

function unableToLogin(res, next) {
  res.status(400);
  const err = new Error("Unable to login.");
  next(err);
}

function userBlocked(res, next) {
  res.status(400);
  const err = new Error("User locked by an administrator.");
  next(err);
}

function incorrectPassword(res, next) {
  res.status(400);
  const err = new Error("Incorrect password.");
  next(err);
}

module.exports = {
  validationError,
  unauthorized,
  getError,
  putError,
  postError,
  deleteError,
  logDBError,
  logBcryptError,
  dbNotFound,
  resourceUpdated,
  resourceDeleted,
  resourceCreated,
  resourceSoftDeleted,
  passwordsMustMatch,
  usernameExists,
  emailExists,
  unableToLogin,
  userBlocked,
  incorrectPassword,
}