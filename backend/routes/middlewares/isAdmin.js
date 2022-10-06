const { unauthorized } = require("../lib/utils");

function isAdmin(req, res, next) {
  if (req.user.role_id == 9) {
    next();
  } else {
    unauthorized(res, next);
  }
}

module.exports = {
  isAdmin,
}