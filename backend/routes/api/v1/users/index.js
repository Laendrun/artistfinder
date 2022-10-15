const express = require('express');

const { createDBConnection } = require('../../../lib/db.js');
const { idSchema, userSchema, changePasswordSchema } = require('../../../lib/validation.js');
const { validationError, getError, putError, postError, deleteError, logDBError, dbNotFound } = require('../../../lib/utils.js');
const { passwordsMustMatch } = require('../../../lib/utils.js');
const { resourceUpdated, resourceDeleted, resourceSoftDeleted } = require('../../../lib/utils.js');

const { isLoggedIn, isAdmin, isUserOrAdmin, isUser } = require('../../../middlewares/');

const router = express.Router();

// GET Routes
// GET all users
router.get('/', (req, res, next) => {
  const connection = createDBConnection();
  connection.promise().query('SELECT user_username, user_id FROM `Users`')
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
    const { error } = userSchema.validate(req.body);
    if ( error === undefined ) {
      const connection = createDBConnection();
      connection.promise().query('UPDATE `Users` SET user_fname = "'+req.body.user_fname+'", user_lname = "'+req.body.user_lname+'", user_email = "'+req.body.user_email+'", type_id = "'+req.body.type_id+'", role_id = "'+req.body.role_id+'" WHERE user_id = "'+req.params.id+'"')
      .then(([rows, fields]) => {
        if (rows.affectedRows != 0) {
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

router.put('/:id/changePassword', isLoggedIn, isUser, (req, res, next) =>{
  const { error } = idSchema.validate(req.params.id);
  if ( error === undefined ) {
    const { error } = changePasswordSchema.validate(req.body);
    if ( error === undefined ) {
      if (req.body.new_password != req.body.confirm_password) {
        passwordsMustMatch(res, next);
      } else {
        // passwords match
        // compare req.body.user_password with password stored in the db
        const connection = createDBConnection();
        connection.promise().query('SELECT Passwords.pass_hash FROM `Passwords` INNER JOIN `Users` ON Users.pass_id = Passwords.pass_id WHERE Users.user_id = '+req.params.id+'"')
        .then(([rows, fields]) => {
          res.json(rows);
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