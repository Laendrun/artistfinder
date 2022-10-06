const { unauthorized } = require("../lib/utils");

function isOwner(req, res, next) {
  if (req.user.artist_id == req.params.id) {
    next();
  } else {
    unauthorized(res, next);
  }
}

module.exports = {
  isOwner,
}