const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const saltRounds = 12;

const { createDBConnection } = require('../../../lib/db.js');
const { idSchema, changePasswordSchema, userUpdateSchema } = require('../../../lib/validation.js');
const { validationError, getError, putError, deleteError, logDBError, dbNotFound, postError } = require('../../../lib/utils.js');
const { passwordsMustMatch, usernameExists, incorrectPassword, logBcryptError } = require('../../../lib/utils.js');
const { resourceUpdated, resourceDeleted, resourceSoftDeleted } = require('../../../lib/utils.js');

const { isLoggedIn, isAdmin, isUserOrAdmin, isUser } = require('../../../middlewares/');

const router = express.Router();

// GET Routes
// GET all users
router.get('/', (req, res, next) => {
  const connection = createDBConnection();
  let select = 'user_username, user_id'
  if (req.user && req.user.role_id == 9){
    select = '*';
  }
  connection.promise().query('SELECT '+ select +' FROM `Users`')
  .then(([rows, fields]) => {
    if (rows.length != 0) {
      res.json(rows);
    } else {
      dbNotFound(res, next);
    }
  })
  .catch((error) => {
    logDBError(error);
    getError(res, next);
  })
  .then( () => connection.end());
});

router.get('/infos', isLoggedIn, (req, res, next) => {
  res.json({
    "user_id": req.user.user_id,
    "user_fname": req.user.user_fname,
    "user_lname": req.user.user_lname,
    "user_username": req.user.user_username,
    "user_email": req.user.user_email,
    "artist_id": req.user.artist_id,
    "type_id": req.user.type_id,
    "role_id": req.user.role_id,
    "login_type": req.user.login_type
  })
});

// GET user WHERE user_id = :id
router.get('/:id', isLoggedIn, isUser, (req, res, next) => {
  const { error } = idSchema.validate({id: req.params.id});
  if ( error === undefined ) {
    const connection = createDBConnection();
    connection.promise().query('SELECT * FROM `Users` WHERE user_id = "'+req.params.id+'"')
    .then(([rows, fields]) => {
      if (rows.length != 0) {
        res.json(rows);
      } else {
        dbNotFound(res, next);
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

// PUT Routes
// UPDATE user WHERE user_id = :id
router.put('/:id', isLoggedIn, isUserOrAdmin, (req, res, next) => {
  const { error } = idSchema.validate({id: req.params.id});
  if ( error === undefined ) {
    const { error } = userUpdateSchema.validate(req.body);
    if ( error === undefined ) {
      // check if username already exists in the db
      const connection = createDBConnection();
      connection.promise().query('SELECT user_username FROM `Users` WHERE user_username = "'+ req.body.user_username +'" AND user_id != "'+ req.params.id +'"')
      .then(([rows, fields]) => {
        console.log(rows.length)
        if (rows.length == 0){
          const connection1 = createDBConnection();
          connection1.promise().query('UPDATE `Users` SET user_username = "'+ req.body.user_username +'", user_fname = "'+req.body.user_fname+'", user_lname = "'+req.body.user_lname+'", user_email = "'+req.body.user_email+'" WHERE user_id = "'+req.params.id+'"')
          .then(([rows, fields]) => {
            if (rows.affectedRows != 0) {
              const connection2 = createDBConnection();
              connection2.promise().query('SELECT * FROM `Users` WHERE user_id = "'+ req.params.id +'"')
              .then(([g_rows, g_fields]) => {
                const secret = process.env.JWT_SECRET;
                const data = {
                  user_id: g_rows[0].user_id,
                  user_fname: g_rows[0].user_fname,
                  user_lname: g_rows[0].user_lname,
                  user_username: g_rows[0].user_username,
                  user_email: g_rows[0].user_email,
                  artist_id: g_rows[0].artist_id,
                  place_id: g_rows[0].place_id,
                  type_id: g_rows[0].type_id, 
                  role_id: g_rows[0].role_id,
                  login_type: g_rows[0].user_login_type
                }
                const update_token = jwt.sign(data, secret);
                res.json({
                  token: update_token
                })
              })
              .catch((error) => {
                logDBError(error);
                getError(res, next);
              })
              .then(() => connection1.end())
              //resourceUpdated(res, req.params.id);
            } else {
              dbNotFound(res, next);
            }
          })
          .catch((error) => {
            logDBError(error);
            putError(res, next);
          })
          .then( () => connection1.end());
        } else {
          usernameExists(res, next);
        }
      })
      .catch((error) => {
        logDBError(error);
        getError(res, next);
      })
      .then(() => connection.end());
    } else {
      validationError(error, res, next);
    }
  } else {
    validationError(error, res, next);
  }
});

router.put('/:id/admin', isLoggedIn, isAdmin, (req, res, next) => {
  const { error } = idSchema.validate({id: req.params.id});
  if ( error === undefined ) {
    const connection = createDBConnection();
    connection.promise().query('UPDATE `Users` SET role_id = "9" WHERE user_id = "'+ req.params.id +'"')
    .then(([rows, fields]) => {
      res.json({
        type: `success`,
        message: `Successfully update user ${req.params.id}`
      })
    })
    .catch((error) => {
      logDBError(error);
      putError(res, next);
    })
    .then(() => connection.end());
  } else {
    validationError(error, res, next);
  }
});

router.put('/:id/user', isLoggedIn, isAdmin, (req, res, next) => {
  const { error } = idSchema.validate({id: req.params.id});
  if ( error === undefined ) {
    const connection = createDBConnection();
    connection.promise().query('UPDATE `Users` SET role_id = "10" WHERE user_id = "'+ req.params.id +'"')
    .then(([rows, fields]) => {
      console.log(rows.affectedRows)
      res.json({
        type: `success`,
        message: `Successfully update user ${req.params.id}`
      })
    })
    .catch((error) => {
      logDBError(error);
      putError(res, next);
    })
    .then(() => connection.end());
  } else {
    validationError(error, res, next);
  }
});

router.put('/:id/block', isLoggedIn, isAdmin, (req, res, next) => {
  const { error } = idSchema.validate({id: req.params.id});
  if ( error === undefined ) {
    const connection = createDBConnection();
    connection.promise().query('UPDATE `Users` SET user_blocked = "1" WHERE user_id = "'+ req.params.id +'"')
    .then(([rows, fields]) => {
      res.json({
        type: `success`,
        message: `Successfully update user ${req.params.id}`
      })
    })
    .catch((error) => {
      logDBError(error);
      putError(res, next);
    })
    .then(() => connection.end());
  } else {
    validationError(error, res, next);
  }
});

router.put('/:id/unblock', isLoggedIn, isAdmin, (req, res, next) => {
  const { error } = idSchema.validate({id: req.params.id});
  if ( error === undefined ) {
    const connection = createDBConnection();
    connection.promise().query('UPDATE `Users` SET user_blocked = "0" WHERE user_id = "'+ req.params.id +'"')
    .then(([rows, fields]) => {
      res.json({
        type: `success`,
        message: `Successfully update user ${req.params.id}`
      })
    })
    .catch((error) => {
      logDBError(error);
      putError(res, next);
    })
    .then(() => connection.end());
  } else {
    validationError(error, res, next);
  }
});

// Soft delete user WHERE user_id = :id
router.put('/:id/delete', isLoggedIn, isUserOrAdmin, (req, res, next) => {
  const { error } = idSchema.validate({id: req.params.id});
  if ( error === undefined ) {
    const connection = createDBConnection();
    connection.promise().query('UPDATE `Users` SET user_softDeleted = "1" WHERE user_id = "'+req.params.id+'"')
    .then(([rows, fields]) => {
      if (rows.affectedRows != 0) {
        resourceSoftDeleted(res, req.params.id);
      } else {
        dbNotFound(res, next);
      }
    })
    .catch((error) => {
      logDBError(error);
      putError(res, next);
    })
    .then( () => connection.end());
  } else {
    validationError(error, res, next);
  }
});

// Switch from Google login to email login
router.put('/:id/switchLogin', isLoggedIn, isUserOrAdmin, (req, res, next) => {
  const { error } = idSchema.validate({id: req.params.id});
  if ( error === undefined ) {
    const connection = createDBConnection();
    connection.promise().query('UPDATE `Users` SET user_login_type = "0" WHERE user_id = "'+req.params.id+'"')
    .then(([rows, fields]) => {
      if (rows.affectedRows != 0) {
        console.log(req.params.id);
        resourceUpdated(res, req.params.id);
      } else {
        dbNotFound(res, next);
      }
    })
    .catch((error) => {
      logDBError(error);
      putError(res, next);
    })
    .then( () => connection.end());
  } else {
    validationError(error, res, next);
  }
});

router.put('/:id/changePassword', isLoggedIn, isUserOrAdmin, (req, res, next) =>{
  const { error } = idSchema.validate({id: req.params.id});
  if ( error === undefined ) {
    const { error } = changePasswordSchema.validate(req.body);
    if ( error === undefined ) {
      if (req.body.new_password != req.body.confirm_password) {
        passwordsMustMatch(res, next);
      } else {
        // passwords match
        // compare req.body.user_password with password stored in the db
        const connection = createDBConnection();
        connection.promise().query('SELECT Passwords.pass_hash, Users.pass_id FROM `Passwords` INNER JOIN `Users` ON Users.pass_id = Passwords.pass_id WHERE Users.user_id = "'+req.params.id+'"')
        .then(([rows, fields]) => {
          bcrypt.compare(req.body.user_password, rows[0].pass_hash)
          .then((result) => {
            if (result) {
              bcrypt.hash(req.body.new_password, saltRounds, function(err, hash) {
                if (!err) {
                  const values = `VALUES (NULL, "${hash}")`
                  connection.promise().query('INSERT INTO `Passwords` (pass_id, pass_hash) '+values)
                  .then(([rows1, fields1]) => {
                    connection.promise().query('UPDATE `Users` SET pass_id = "'+ rows1.insertId +'" WHERE user_id = "' + req.params.id +'"')
                    .then(([rows2, fields2]) =>{
                      connection.promise().query('DELETE FROM `Passwords` WHERE pass_id = "'+ rows[0].pass_id + '"')
                      .then(([rows3, field3]) => {
                        res.json({
                          message: "Password changed.",
                          type: "success",
                        })
                      })
                    })
                    .catch((error) => {
                      logDBError(error);
                      putError(res, next);
                    })
                  })
                  .catch((error) => {
                    logDBError(error);
                    postError(res, next);
                  })
                } else {
                  logBcryptError(err);
                  res.status(500);
                  res.json({
                    message: "Error with the password.",
                    type: "error"
                  })
                }
              });
            } else {
              incorrectPassword(res, next);
            }
          })
          .catch((error) => {
            logBcryptError(error);
            res.status(500);
            res.json({
              message: "Error with the password.",
              type: "error"
            })
          })
          //res.json(rows);
        })
        .catch((error) => {
          logDBError(error);
          getError(res, next);
        })
      }
    } else {
      validationError(error, res, next);
    }
  } else {
    validationError(error, res, next);
  }
});

router.put('/:id/resetPassword', isLoggedIn, isAdmin, (req, res, next) => {
  const { error } = idSchema.validate({id: req.params.id});
  if (error === undefined) {
    bcrypt.hash(req.body.new_password, saltRounds, function(err, hash) {
      if (!err) {
        const connection = createDBConnection();
        connection.promise().query('SELECT pass_id FROM `Users` WHERE user_id = "' + req.params.id +'"')
        .then(([rows, fields]) => {
          const values = `VALUES (NULL, "${hash}")`
          const connection1 = createDBConnection();
          connection1.promise().query('INSERT INTO `Passwords` (pass_id, pass_hash) '+values)
          .then(([rows1, fields1]) => {
            const connection2 = createDBConnection();
            connection2.promise().query('UPDATE `Users` SET pass_id = "'+ rows1.insertId +'" WHERE user_id = "' + req.params.id +'"')
            .then(([rows2, fields2]) =>{
              const connection3 = createDBConnection();
              connection3.promise().query('DELETE FROM `Passwords` WHERE pass_id = "'+ rows[0].pass_id + '"')
              .then(([rows3, field3]) => {
                res.json({
                  message: "Password resetted",
                  type: "success"
                })
              })
              .catch((error) => {
                logDBError(error);
                deleteError(res, next);
              })
              .then(() => connection3.end())
            })
            .catch((error) => {
              logDBError(error);
              putError(res, next);
            })
            .then(() => connection2.end());
          })
          .catch((error) => {
            logDBError(error);
            postError(res, next);
          })
          .then(() => connection1.end());
        })
        .catch((error) => {
          logDBError(error);
          getError(res, next);
        })
        .then(() => connection.end())
      } else {
        logBcryptError(err);
        res.status(500);
        res.json({
          message: "Error with the password.",
          type: "error"
        })
      }
    });
  } else {
    validationError(error, res, next);
  }
})

// DELETE Routes
// DELETE user WHERE user_id = :id
router.delete('/:id', isLoggedIn, isAdmin, (req, res, next) => {
  const { error } = idSchema.validate({id: req.params.id});
  if ( error === undefined ) {
    const connection = createDBConnection();
    connection.promise().query('DELETE FROM `Users` WHERE user_id = "'+req.params.id+'"')
    .then(([rows, fields]) => {
      if (rows.affectedRows != 0) {
        resourceDeleted(res, req.params.id);
      } else {
        dbNotFound(res, next);
      }
    })
    .catch((error) => {
      logDBError(error);
      deleteError(res, next);
    })
    .then( () => connection.end());
  } else {
    validationError(error, res, next);
  }
});

module.exports = router;