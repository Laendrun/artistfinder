const jwt = require('jsonwebtoken');

const { createDBConnection } = require('../lib/db.js');
const { unauthorized } = require('../lib/utils.js');

function checkTokenSetUser(req, res, next) {
// this middleware checks if the Authorization header is set
// if the Authorization exists and contains a token
// sets req.user as the payload from the decoded token
  const authHeader =  req.get('Authorization');
  if (token) {

  } else {
    jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
      if (error)
        unauthorized(res, next);
      console.log(payload);
    })
  }
}

module.exports = {
  checkTokenSetUser,
}