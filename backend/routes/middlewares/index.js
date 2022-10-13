const jwt = require('jsonwebtoken');
const { unauthorized, unableToLogin } = require("../lib/utils");

function checkTokenSetUser(req, res, next) {
  // this middleware checks if the Authorization header is set
  // if the Authorization exists and contains a token
  // sets req.user as the payload from the decoded token
    const authHeader =  req.get('Authorization');
    if (authHeader){
      const token = authHeader.split(' ')[1];
      if (token){
        jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
          if (error) {
            console.error(error);
            unauthorized(res, next);
          }
          req.user = payload;
          next();
        });
      } else {
        next();
      }
    }
    else {
      next();
    }
  }

  function isLoggedIn(req, res, next) {
    if (req.user) {
      next();
    } else {
      unauthorized(res, next);
    }
  }

  function isAdmin(req, res, next) {
    if (req.user.role_id == 9) {
      next();
    } else {
      unauthorized(res, next);
    }
  }

  function isOwner(req, res, next) {
    if (req.user.artist_id == req.params.id || req.user.place_id == req.params.id) {
      next();
    } else {
      unauthorized(res, next);
    }
  }

  function isUser(req, res, next) {
    if (req.user.user_id == req.params.id) {
      console.log(req.user.user_id);
      next();
    } else {
      unauthorized(res, next);
    }
  }

  function isUserOrAdmin(req, res, next) {
    if (req.user.user_id == req.params.id || req.user.role_id == 9) {
      next();
    } else {
      unauthorized(res, next);
    }
  }

  function isOwnerOrAdmin(req, res, next) {
    if (req.user.artist_id == req.params.id || req.user.role_id == 9) {
      next();
    } else {
      unauthorized(res, next);
    }
  }

  module.exports = {
    checkTokenSetUser,
    isLoggedIn,
    isAdmin,
    isOwner,
    isOwnerOrAdmin,
    isUser,
    isUserOrAdmin,
  }