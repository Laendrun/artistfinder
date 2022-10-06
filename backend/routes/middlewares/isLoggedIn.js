const { unauthorized } = require("../lib/utils");

function isLoggedIn(req, res, next) {
  if (req.user) {
    next();
  } else {
    unauthorized(res, next);
  }
}

module.exports = {
  isLoggedIn,
}