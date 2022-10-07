const express = require('express');

const { createDBConnection } = require('../../../lib/db.js');
const { idSchema, artistSchema } = require('../../../lib/validation.js');
const { validationError } = require('../../../lib/utils.js');

const { isLoggedIn } = require('../../../middlewares/isLoggedIn.js');
const { isAdmin } = require('../../../middlewares/isAdmin.js');

const router = express.Router();

// GET Routes
// GET all types
router.get('/', (req, res, next) => {
  const connection = createDBConnection();
  connection.promise().query('SELECT * FROM `Types`')
  .then(([rows, fields]) => {
    res.json(rows);
  })
  .catch(console.log())
  .then( () => connection.end());
});

// GET type WHERE type_id = :id
router.get('/:id', (req, res, next) => {
  const { error } = idSchema.validate({id: req.params.id});
  if ( error === undefined ) {
    const connection = createDBConnection();
    connection.promise().query('SELECT * FROM `Types` WHERE type_id = "'+req.params.id+'"')
    .then(([rows, fields]) => {
      res.json(rows);
    })
    .catch(console.log())
    .then( () => connection.end());
  } else {
    validationError(error, res, next);
  }
});

// POST Routes
// INSERT new style
router.post('/', isLoggedIn, isAdmin, (req, res, next) => {
  const { error } = typeSchema.validate(req.body);
  if ( error === undefined ) {
    const connection = createDBConnection();
    const values = ` VALUES (NULL, "${req.body.type_name}")`
    connection.promise().query('INSERT INTO `Types` (type_id, type_name)'+values)
    .then(([rows, fields]) => {
      res.json(rows);
    })
    .catch(console.log())
    .then( () => connection.end());
  } else {
    validationError(error, res, next);
  }
});

// PUT Routes
// UPDATE type WHERE type_id = :id
router.put('/:id', isLoggedIn, isAdmin, (req, res, next) => {
  const { error } = idSchema.validate({id: req.params.id});
  if ( error === undefined )  {
    const { error } = typeSchema.validate(req.body);
    if ( error === undefined ) {
      const connection = createDBConnection();
      connection.promise().query('UPDATE `Types` SET type_name = "'+req.body.type_name+'" WHERE type_id = "'+req.params.id+'"')
      .then(([rows, fields]) => {
        res.json(rows);
      })
      .catch(console.log())
      .then( () => connection.end());
    } else {
      validationError(error, res, next);
    }
  } else {
    validationError(error, res, next);
  }
});

// DELETE Routes
// DELETE type WHERE type_id = :id
router.delete('/:id', isLoggedIn, isAdmin, (req, res, next) => {
  const { error } = idSchema.validate({id: req.params.id});
  if ( error === undefined ) {
    const connection = createDBConnection();
    connection.promise().query('DELETE FROM `Types` WHERE type_id = "'+req.params.id+'"')
    .then(([rows, fields]) => {
      res.json(rows);
    })
    .catch(console.log())
    .then( () => connection.end());
  } else {
    validationError(error, res, next);
  }
});

module.exports = router;