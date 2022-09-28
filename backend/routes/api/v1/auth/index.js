const express = require('express');
const jwt_decode = require('jwt-decode');
const sign = require('jwt-encode');

const { createDBConnection } = require('../../../lib/db.js');
const { signupSchema } = require('../../../lib/validation.js');
const { validationError } = require('../../../lib/utils.js');

const router = express.Router();

router.post('/google/', (req, res, next) => {

  const token = req.body.token;
  const decoded = jwt_decode(token);

  const user_email = decoded.email;
  const user_fname = decoded.given_name;
  const user_lname = decoded.family_name; 
  const type_id = 3;
  const role_id = 10;
  const user_login_type = 1

  const connection = createDBConnection();
  connection.promise().query('SELECT * FROM `Users` WHERE user_email = "'+user_email+'" AND user_login_type = "'+user_login_type+'"')
  .then(([rows, fields]) => {

    if (rows.length == 0) {
      const values = `VALUES (NULL, "${user_fname}", "${user_lname}", "${user_email}", "${type_id}", "${role_id}", "${user_login_type}")`;
      connection.promise().query('INSERT INTO `Users` (user_id, user_fname, user_lname, user_email, type_id, role_id, user_login_type) '+values)
      .then(([rows, fields]) => {

        const secret = '8qBmQ3J0Wn4Hw6ooHeZsHv6qON2m4f20olRY';
        const data = {
          user_id: rows.insertId,
          user_fname: user_fname,
          user_lname: user_lname,
          type_id: type_id, 
          role_id: role_id
        }

        const jwt = sign(data, secret);
        res.json(jwt);
      })
      .catch(console.log())
      .then( () => connection.end());
    } else {
      connection.promise().query('SELECT * FROM `Users` WHERE user_email = "'+user_email+'" AND user_login_type = "'+user_login_type+'"')
      .then(([rows, fields]) => {
        const secret = '8qBmQ3J0Wn4Hw6ooHeZsHv6qON2m4f20olRY'

        const data = {
          user_id: rows[0].user_id,
          user_fname: rows[0].user_fname,
          user_lname: rows[0].user_lname,
          type_id: rows[0].type_id,
          role_id: rows[0].role_id
        }

        const jwt = sign(data, secret);
        res.json(jwt);
      })
      .catch(console.log())
      .then( () => connection.end());
    }

  })
  .catch(console.log())
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

