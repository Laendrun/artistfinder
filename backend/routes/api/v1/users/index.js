const express = require('express');

const { createDBConnection } = require('../../../lib/db.js');
const { idSchema, userSchema } = require('../../../lib/validation.js');
const { validationError, getError, putError, postError, deleteError, logDBError } = require('../../../lib/utils.js');

const { isLoggedIn, isAdmin, isOwner, isOwnerOrAdmin } = require('../../../middlewares/');

const router = express.Router();

// GET Routes
// GET all users
router.get('/', (req, res, next) => {
  const connection = createDBConnection();
  connection.promise().query('SELECT user_username FROM `Users`')
  .then(([rows, fields]) => {
    res.json(rows);
  })
  .catch((error) => {
    logDBError(error);
    getError(res, next);
  })
  .then( () => connection.end());
});

// GET user WHERE user_id = :id
router.get('/:id', isLoggedIn, isOwner, (req, res, next) => {
  const { error } = idSchema.validate({id: req.params.id});
  if ( error === undefined ) {
    const connection = createDBConnection();
    connection.promise().query('SELECT * FROM `Users` WHERE user_id = "'+req.params.id+'"')
    .then(([rows, fields]) => {
      res.json(rows);
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

// POST Routes
// INSERT new user
router.post('/', (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if ( error === undefined ) {
    const connection = createDBConnection();
    const values = `VALUES (NULL, "${req.body.user_fname}", "${req.body.user_lname}", "${req.body.user_email}", "${req.body.type_id}", "${req.body.role_id}")`
    connection.promise().query('INSERT INTO `Users` (user_id, user_fname, user_lname, user_email, type_id, role_id) '+values)
    .then(([rows, fields]) => {
      res.json(rows);
    })
    .catch((error) => {
      logDBError(error);
      postError(res, next);
    })
    .then( () => connection.end());
  } else {
    validationError(error, res, next);
  } 
});

// PUT Routes
// UPDATE user WHERE user_id = :id
router.put('/:id', isLoggedIn, isOwnerOrAdmin, (req, res, next) => {
  const { error } = idSchema.validate({id: req.params.id});
  if ( error === undefined ) {
    const { error } = userSchema.validate(req.body);
    if ( error === undefined ) {
      const connection = createDBConnection();
      connection.promise().query('UPDATE `Users` SET user_fname = "'+req.body.user_fname+'", user_lname = "'+req.body.user_lname+'", user_email = "'+req.body.user_email+'", type_id = "'+req.body.type_id+'", role_id = "'+req.body.role_id+'" WHERE user_id = "'+req.params.id+'"')
      .then(([rows, fields]) => {
        res.json(rows);
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

// DELETE Routes
// DELETE user WHERE user_id = :id
router.delete('/:id', isLoggedIn, isAdmin, (req, res, next) => {
  const { error } = idSchema.validate({id: req.params.id});
  if ( error === undefined ) {
    const connection = createDBConnection();
    connection.promise().query('DELETE FROM `Users` WHERE user_id = "'+req.params.id+'"')
    .then(([rows, fields]) => {
      res.json(rows);
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