// Don't forget to get the JWT secret from the env variable

const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const saltRounds = 12;

const { createDBConnection } = require('../../../lib/db.js');
const { signupSchema, signinSchema } = require('../../../lib/validation.js');
const { validationError, getError, postError, logDBError, unableToLogin } = require('../../../lib/utils.js');
const { passwordsMustMatch, usernameExists, emailExists } = require('../../../lib/utils.js');

const router = express.Router();

router.post('/google/', (req, res, next) => {

  const google_token = req.body.token;
  const decoded = jwt.decode(google_token);

  const user_email = decoded.email;
  const user_fname = decoded.given_name;
  const user_lname = decoded.family_name; 
  const user_username = decoded.given_name + ' ' + decoded.family_name;
  const type_id = 3;
  const role_id = 10;
  const user_login_type = 1

  const connection = createDBConnection();
  connection.promise().query('SELECT * FROM `Users` WHERE user_email = "'+user_email+'" AND user_login_type = "'+user_login_type+'"')
  .then(([rows, fields]) => {

    if (rows.length == 0) {
      const values = `VALUES (NULL, "${user_fname}", "${user_lname}", "${user_username}", "${user_email}", "${type_id}", "${role_id}", "${user_login_type}")`;
      connection.promise().query('INSERT INTO `Users` (user_id, user_fname, user_lname, user_username, user_email, type_id, role_id, user_login_type) '+values)
      .then(([rows, fields]) => {

        const secret = process.env.JWT_SECRET;
        const data = {
          user_id: rows.insertId,
          user_fname: user_fname,
          user_lname: user_lname,
          user_username: user_username,
          artist_id: null,
          type_id: type_id, 
          role_id: role_id
        }

        const token = jwt.sign(data, secret);
        res.json(token);
      })
      .catch((error) => {
        logDBError(error);
        postError(res, next);
      });
    } else {
      connection.promise().query('SELECT * FROM `Users` WHERE user_email = "'+user_email+'" AND user_login_type = "'+user_login_type+'"')
      .then(([rows, fields]) => {
        const secret = process.env.JWT_SECRET;

        const data = {
          user_id: rows[0].user_id,
          user_fname: rows[0].user_fname,
          user_lname: rows[0].user_lname,
          user_username: rows[0].user_username,
          artist_id: rows[0].artist_id,
          type_id: rows[0].type_id,
          role_id: rows[0].role_id
        }

        const token = jwt.sign(data, secret);
        res.json(token);
      })
      .catch((error) => {
        logDBError(error);
        getError(res, next);
      });
    }

  })
  .catch((error) => {
    logDBError(error);
    getError(res, next);
  })
  .then( () => connection.end());

});

router.post('/signup/', (req, res, next) => {
  const { error } = signupSchema.validate(req.body);
  if ( error === undefined ) {
    // check if passwords match
    if (req.body.user_password != req.body.confirm_password) {
      passwordsMustMatch(res, next);
    }
    const connection = createDBConnection();
    // check if username already exists
    connection.promise().query('SELECT user_username FROM `Users` WHERE user_username = "'+req.body.user_username+'"')
    .then(([rows, fields]) => {
      if (rows.length != 0) {
        // if username exists send back an error
        usernameExists(res, next);
      } else {
        // if username does not exist, check if email exists
        const connection1 = createDBConnection();
        connection1.promise().query('SELECT user_email FROM `Users` WHERE user_email = "'+req.body.user_email+'"')
        .then(([rows, fields]) => {
          if (rows.length != 0 ) {
            // if email exists send back an error
            emailExists(res, next);
          } else {
            // if email does not exist, hash password
            bcrypt.hash(req.body.user_password, saltRounds, function(err, hash) {
              if (error === undefined ) {
                // if no error hashing the password, save it into the db
                const connection2 = createDBConnection();
                connection2.promise().query('INSERT INTO `Passwords` (pass_id, pass_hash) VALUES (NULL, "'+hash+'")')
                .then(([rows, fields]) => {
                  // if no error saving the hashed password, save the user
                  const connection3 = createDBConnection();
                  const values = `VALUES (NULL, "${req.body.user_fname}", "${req.body.user_lname}", "${req.body.user_username}", "${req.body.user_email}", "${rows.insertId}", "3", "10", "0")`;
                  connection3.promise().query('INSERT INTO `Users` (user_id, user_fname, user_lname, user_username, user_email, pass_id, type_id, role_id, user_login_type) '+ values)
                  .then(([rows, fields]) => {
                    // when user saved in the db, send back the JWT
                    const secret = process.env.JWT_SECRET;

                    const data = {
                      user_id: rows.insertId,
                      user_fname: req.body.user_fname,
                      user_lname: req.body.user_lname,
                      user_username: req.body.user_username,
                      artist_id: null,
                      type_id: 3,
                      role_id: 10,
                    }
            
                    const token = jwt.sign(data, secret);
                    res.json(token);
                  })
                  .catch((error) => {
                    logDBError(error);
                    postError(res, next);
                  })
                  .then( () => connection3.end());
                })
                .catch((error) => {
                  logDBError(error);
                  postError(res, next);
                })
                .then( () => connection2.end());
              } else {
                next(error);
              }
            });
          }
        })
        .catch((error) => {
          logDBError(error);
          getError(res, next);
        })
        .then( () => connection1.end());
      }
    })
    .catch((error) => {
      logDBError(error);
      getError(res, next);
    })
    .then( () => connection.end());
  } else {
    validationError(error, res, next);
  }
});

router.post('/signin/', (req, res, next) => {
  const { error } = signinSchema.validate(req.body);
  if ( error === undefined ) {
    const connection = createDBConnection();
    connection.promise().query('SELECT * FROM `Users` WHERE user_username = "'+req.body.user_username+'"')
    .then(([rows, fields]) => {
      // check if username exists
      if (rows.length != 0) {
        // hash password and compare it to the password saved in the db with pass_id
        const connection1 = createDBConnection();
        connection1.promise().query('SELECT pass_hash FROM `Passwords` WHERE pass_id = "'+rows[0].pass_id+'"')
        .then(([pass_rows, fields]) => {
          bcrypt.compare(req.body.user_password, pass_rows[0].pass_hash, (err, success) => {
            if (success) {
              // send back the JWT
              const secret = process.env.JWT_SECRET;
              const data = {
                user_id: rows[0].user_id,
                user_fname: rows[0].user_fname,
                user_lname: rows[0].user_lname,
                user_username: rows[0].user_username,
                artist_id: rows[0].artist_id,
                type_id: rows[0].type_id,
                role_id: rows[0].role_id,
              };
              const token = jwt.sign(data, secret);
              res.json(token);
            } else {
              unableToLogin(res, next);
            }
          });
        })
        .catch((error) => {
          logDBError(error);
          getError(res, next);
        })
        .then( () => connection1.end());
      } else {
        unableToLogin(res, next);
      }
    })
    .catch((error) => {
      logDBError(error);
      getError(res, next);
    })
    .then( () => connection.end());
  } else {
    validationError(error, res, next);
  }
    // if hashes correspond
      // send back a token
    // else
      // Unable to login.
});

module.exports = router;

