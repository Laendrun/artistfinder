const { unauthorized } = require("../lib/utils");

function isLoggedIn(req, res, next) {
  if (req.user) {
    next();
  } else {
    unauthorized(req, next);
  }
}

module.exports = {
  isLoggedIn,
}