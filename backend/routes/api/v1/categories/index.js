const express = require('express');

const { createDBConnection } = require('../../../lib/db.js');
const { idSchema, nameSchema, categorySchema } = require('../../../lib/validation.js');
const { validationError } = require('../../../lib/utils.js');

const { isLoggedIn } = require('../../../middlewares/isLoggedIn.js');
const { isAdmin } = require('../../../middlewares/isAdmin.js');

const router = express.Router();

// GET routes
// GET all categories
router.get('/', (req, res, next) => {
  const connection = createDBConnection();
  connection.promise().query('SELECT * FROM `Categories`')
  .then(([rows, fields]) => {
    res.json(rows);
  })
  .catch(console.log())
  .then( () => connection.end());
});

// GET category WHERE category_id = :id
router.get('/:id', (req, res, next) => {
  const { error } = validate({id: req.params.id});
  if ( error === undefined ) {
    const connection = createDBConnection();
    connection.promise().query('SELECT * FROM `Categories` WHERE category_id = "'+ req.params.id + '"')
    .then(([rows, fields]) => {
      res.json(rows);
    })
    .catch(console.log())
    .then( () => connection.end());
  } else {
    validationError(error, res, next);
  }
});

// GET all categories WHERE category_name LIKE :name
router.get('/name/:name', (req, res, next) => {
  const { error } = nameSchema.validate({name: req.params.name});
  if ( error === undefined ) {
    const connection = createDBConnection();
    connection.promise().query('SELECT * FROM `Categories` WHERE category_name LIKE "%'+ req.params.name + '%"')
    .then(([rows, fields]) => {
      res.json(rows);
    })
    .catch(console.log())
    .then( () => connection.end());
  } else {
    validationError(error, res, next);
  }
});

// POST routes
// POST new category
router.post('/', isLoggedIn, isAdmin, (req, res, next) => {
  const { error } = categorySchema.validate(req.body);
  if (error === undefined) {
    const connection = createDBConnection();
    const values = `VALUES (NULL, "${req.body.name}")`;
    connection.promise().query('INSERT INTO `Categories` '+ values)
    .then(([rows, fields]) => {
      res.json(rows);
    })
    .catch(console.log())
    .then( () => connection.end());
  } else {
    validationError(error, res, next);
  }
})

// PUT routes
// UPDATE category WHERE category_id = :id
router.put('/:id', isLoggedIn, isAdmin, (req, res, next) => {
  const { error } = idSchema.validate({id: req.params.id});
  if ( error === undefined ) {
    const connection = createDBConnection();
    connection.promise().query('UPDATE `Categories` SET category_name = "'+ req.body.name +'" WHERE category_id = "'+ req.params.id +'"')
    .then(([rows, fields]) => {
      res.json(rows);
    })
    .catch(console.log())
    .then( () => connection.end());
  } else {
    validationError(error, res, next);
  }
});

// DELETE routes
// DELETE category WHERE category_id = :id
router.delete('/:id', isLoggedIn, isAdmin, (req, res, next) => {
  const { error } = idSchema.validate({id: req.params.id});
  if ( error === undefined ) {
    const connection = createDBConnection();
    connection.promise().query('DELETE FROM `Categories` WHERE category_id = "'+ req.params.id + '"')
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