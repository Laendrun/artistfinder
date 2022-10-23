const express = require('express');

const { createDBConnection } = require('../../../lib/db.js');
const { idSchema, roleSchema } = require('../../../lib/validation.js');
const { validationError, getError, putError, postError, deleteError, logDBError, dbNotFound } = require('../../../lib/utils.js');
const { resourceCreated, resourceUpdated, resourceDeleted } = require('../../../lib/utils.js');

const { isLoggedIn, isAdmin } = require('../../../middlewares/');

const router = express.Router();

// GET Routes
// GET all roles
router.get('/', (req, res, next) => {
  const connection = createDBConnection();
  connection.promise().query('SELECT * FROM `Roles`')
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

// GET role where role_id = :id
router.get('/:id', (req, res, next) => {
  const { error } = idSchema.validate({id: req.params.id});
  if ( error === undefined ) {
    const connection = createDBConnection();
    connection.promise().query('SELECT * FROM `Roles` WHERE role_id = ?', 
    [ req.params.id ])
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

// POST Routes
// INSERT new role
router.post('/', isLoggedIn, isAdmin, (req, res, next) => {
  const { error } = roleSchema.validate(req.body);
  if ( error === undefined ) {
    const connection = createDBConnection();
    connection.promise().query('INSERT INTO `Roles` (`role_id`, `role_name`) VALUES (NULL, ?)', 
    [ req.body.role_name ])
    .then(([rows, fields]) => {
      resourceCreated(res, rows.insertId);
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
// UPDATE role WHERE role_id = :id
router.put('/:id', isLoggedIn, isAdmin, (req, res, next) => {
  const { error } = idSchema.validate({id: req.params.id});
  if ( error === undefined ) {
    const { error } = roleSchema.validate(req.body);
    if ( error === undefined ) {
      const connection = createDBConnection();
      connection.promise().query('UPDATE `Roles` SET role_name = ? WHERE role_id = ?', 
      [req.body.role_name, req.params.id ])
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

// DELETE Routes
// DELETE role WHERE role_id = :id
router.delete('/:id', isLoggedIn, isAdmin, (req, res, next) => {
  const { error } = idSchema.validate({id: req.params.id});
  if ( error === undefined ) {
    const connection = createDBConnection();
    connection.promise().query('DELETE FROM `Roles` WHERE role_id = ?', 
    [ req.params.id ])
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