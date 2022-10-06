const { unauthorized } = require("../lib/utils");

function isOwnerOrAdmin(req, res, next) {
  if (req.user.artist_id == req.params.id || req.user.role_id == 9) {
    next();
  } else {
    unauthorized(res, next);
  }
}

module.exports = {
  isOwnerOrAdmin,
}