const express = require('express');

const { createDBConnection } = require('../../../lib/db.js');
const { idSchema, nameSchema, placeSchema, citySchema, post_codeSchema, capacitySchema } = require('../../../lib/validation.js');
const { validationError, getError, putError, postError, deleteError, logDBError } = require('../../../lib/utils.js');

const { isLoggedIn, isOwnerOrAdmin } = require('../../../middlewares/');

const router = express.Router();

// GET routes
// GET all places
router.get('/', (req, res, next) => {
  const connection = createDBConnection();
  connection.promise().query('SELECT * FROM `Places`')
  .then(([rows, fields]) => {
    res.json(rows);
  })
  .catch((error) => {
    logDBError(error);
    getError(res, next);
  })
  .then( () => connection.end());
});

// GET place by id
router.get('/:id', (req, res, next) => {
  const { error } = idSchema.validate({id: req.params.id});
  if ( error === undefined ){
    const connection = createDBConnection();
    connection.promise().query('SELECT * FROM `Places` WHERE place_id = "'+ req.params.id +'"')
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

// GET all places WHERE name LIKE :name
router.get('/name/:name', (req, res, next) => {
  const { error } = nameSchema.validate({name: req.params.name});
  if ( error === undefined ){
    const connection = createDBConnection();
    connection.promise().query('SELECT * FROM `Places` WHERE place_name LIKE "%'+ req.params.name +'%"')
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

// GET all places WHERE post_code = :post_code
router.get('/post_code/:post_code', (req, res, next) => {
  const { error } = post_codeSchema.validate({post_code: req.params.post_code});
  if ( error === undefined ){
    const connection = createDBConnection();
    connection.promise().query('SELECT * FROM `Places` WHERE place_postCode = "'+ req.params.post_code +'"')
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

// GET all places WHERE city = :city
router.get('/city/:city', (req, res, next) => {
  const { error } = citySchema.validate({city: req.params.city});
  if ( error === undefined ) {
    const connection = createDBConnection();
    connection.promise().query('SELECT * FROM `Places` WHERE place_city LIKE "%'+ req.params.city +'%"')
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

// GET all places with capacity >= :capacity
router.get('/capacity/min/:capacity', (req, res, next) => {
  const { error } = capacitySchema.validate({capacity: req.params.capacity});
  if ( error === undefined ) {
    const connection = createDBConnection();
    connection.promise().query('SELECT * FROM `Places` WHERE place_capacity >= "'+ req.params.capacity +'"')
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

// GET all places with capacity <= :capacity
router.get('/capacity/max/:capacity', (req, res, next) => {
  const { error } = capacitySchema.validate({capacity: req.params.capacity});
  if ( error === undefined ) {
    const connection = createDBConnection();
    connection.promise().query('SELECT * FROM `Places` WHERE place_capacity <= "'+ req.params.capacity +'"')
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

// GET all places with capacity = :capacity
router.get('/capacity/is/:capacity', (req, res, next) => {
  const { error } = capacitySchema.validate({capacity: req.params.capacity});
  if ( error === undefined ){
    const connection = createDBConnection();
    connection.promise().query('SELECT * FROM `Places` WHERE place_capacity = "'+ req.params.capacity +'"')
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

// POST routes
// INSERT a new place
router.post('/', isLoggedIn, (req, res, next) => {
  const { error } = placeSchema.validate(req.body);
  if ( error === undefined ) {
    const connection = createDBConnection();
    let values = `VALUES (NULL, "${req.body.place_name}", "${req.body.place_capacity}", "${req.body.place_address}", "${req.body.place_postCode}", "${req.body.place_city}")`;
    connection.promise().query('INSERT INTO `Places` (`place_id`, `place_name`, `place_capacity`, `place_address`, `place_postCode`, `place_city`) '+values)
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

// PUT routes
// UPDATE place with id = :id
router.put('/:id', isLoggedIn, isOwnerOrAdmin, (req, res, next) => {
  const { error } = idSchema.validate({id: req.params.id});
  if ( error === undefined ) {
    const { error } = placeSchema.validate(req.body);
    if ( error === undefined ) {
      const connection = createDBConnection();
      connection.promise().query('UPDATE `Places` SET place_name = "'+ req.body.place_name +'", place_capacity = "'+ req.body.place_capacity +'", place_address = "'+ req.body.palce_address +'", place_postCode = "'+ req.body.place_postCode +'", place_city = "'+ req.body.place_city +'" WHERE place_id = "'+ req.params.id +'"')
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

// DELETE routes
// DELETE place with id = :id
router.delete('/:id', isLoggedIn, isOwnerOrAdmin, (req, res, next) => {
  const { error } = idSchema.validate({id: req.params.id});
  if ( error === undefined ) {
    const connection = createDBConnection();
    connection.promise().query('DELETE FROM `Places` WHERE place_id = "'+ req.params.id +'"')
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