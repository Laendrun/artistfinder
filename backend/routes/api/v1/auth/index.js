// Don't forget to get the JWT secret from the env variable

const express = require('express');
const jwt = require('jsonwebtoken');

const { createDBConnection } = require('../../../lib/db.js');
const { signupSchema } = require('../../../lib/validation.js');
const { validationError, getError, postError, logDBError } = require('../../../lib/utils.js');

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
    // insert user in the db
    res.json(req.body);
  } else {
    validationError(error, res, next);
  }
});

module.exports = router;

