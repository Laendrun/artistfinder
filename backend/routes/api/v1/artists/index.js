const express = require('express');

const { createDBConnection } = require('../../../lib/db.js');
const { idSchema, nameSchema, artistSchema } = require('../../../lib/validation.js');
const { validationError } = require('../../../lib/utils.js');

const { isLoggedIn, isOwnerOrAdmin, isAdmin } = require('../../../middlewares/');

const router = express.Router();

// GET routes 
// GET all artists
router.get('/', (req, res, next) => {
  connection = createDBConnection();

  connection.promise().query('SELECT * FROM `Artists`')
  .then(([rows, field]) => {
    res.json(rows);
  })
  .catch(console.log())
  .then( () => connection.end());
});

// GET all groups
router.get('/groups/', (req, res, next) => {
  connection = createDBConnection();
  connection.promise().query('SELECT * FROM `Artists` WHERE `artist_isGroup` = true')
  .then(([rows, field]) => {
    res.json(rows);
  })
  .catch(console.log())
  .then( () => connection.end());
});

// GET all notGroups
router.get('/notGroups/', (req, res, next) => {
  connection = createDBConnection();
  connection.promise().query('SELECT * FROM `Artists` WHERE `artist_isGroup` = false')
  .then(([rows, fields]) => {
    res.json(rows);
  })
  .catch(console.log())
  .then( () => connection.end());
});

// GET all artists by type_id
router.get('/type/:type_id', (req, res, next) => {
  const { error } = idSchema.validate({id : req.params.type_id});
  if (error === undefined) {
    connection = createDBConnection();
    connection.promise().query('SELECT * FROM `Artists` WHERE Artists.type_id = ' + req.params.type_id)
    .then(([rows, fields]) => {
      res.json(rows);
    })
    .catch(console.log())
    .then( () => connection.end());
  } else {
    validationError(error, res, next);
  }
});

// GET all artists where type name LIKE :name
router.get('/type/name/:name', (req, res, next) => {
  const { error } = nameSchema.validate({name: req.params.name});

  if (error === undefined) {
    connection = createDBConnection();
    connection.promise().query('SELECT * FROM `Artists` INNER JOIN `Types` ON Artists.type_id = Types.type_id WHERE Types.type_name LIKE \'%'+req.params.name+'%\'')
    .then(([rows, fields]) => {
      res.json(rows);
    })
    .catch(console.erro)
    .then( () => connection.end());
  } else {
    validationError(error, res, next);
  }
});

// GET artist by :ID
router.get('/:id', (req, res, next) => {
  const { error } = idSchema.validate({id: req.params.id});
  if (error === undefined){
    connection = createDBConnection();
    connection.promise().query('SELECT * FROM `Artists` WHERE Artists.artist_id = "'+ req.params.id +'"')
    .then(([rows, fields]) => {
      res.json(rows);
    })
    .catch(console.error)
    .then( () => connection.end());
  } else {
    validationError(error, res, next);
  }
});

// GET all artists where name LIKE :name
router.get('/name/:name', (req, res, next) => {
  
  const { error } = nameSchema.validate({name: req.params.name});
  if (error === undefined){
    connection = createDBConnection();
    connection.promise().query('SELECT * FROM `Artists` WHERE Artists.artist_name LIKE \'%'+req.params.name+'%\'')
    .then(([rows, fields]) => {
      res.json(rows);
    })
    .catch(console.error)
    .then( () => connection.end());
  } else {
    validationError(error, res, next);
  }
});

// POST routes
// POST new artist
router.post('/', isLoggedIn, (req, res, next) => {

  const { error } = artistSchema.validate(req.body);

  if ( error === undefined ) {
    connection = createDBConnection();
    let values = `VALUES (NULL, "${req.body.artist_name}", "${req.body.artist_isGroup}", "${req.body.type_id}", "${req.body.style_id}")`;
    req.body.isGroup = req.body.isGroup ? 1 : 0;
    connection.promise().query('INSERT INTO `Artists` (`artist_id`, `artist_name`, `artist_isGroup`, `type_id`, `style_id`) '+values)
    .then(([rows, fields]) => {
      res.json(rows);
    })
    .catch(console.error)
    .then( () => connection.end());
  } else {
    validationError(error, res, next);
  }

});

// PUT routes
// UPDATE artist with id = :id
router.put('/:id', isLoggedIn, isOwnerOrAdmin, (req, res, next) => {

  const { error } = idSchema.validate({id: req.params.id});
  if ( error === undefined) {
    const { error } = artistSchema.validate(req.body);

    if ( error === undefined ) {
      connection = createDBConnection();
      req.body.isGroup = req.body.isGroup ? 1 : 0;
      connection.promise().query('UPDATE `Artists` SET artist_name = "'+ req.body.artist_name +'", artist_isGroup = "'+ req.body.artist_isGroup +'", type_id = "'+ req.body.type_id +'", style_id = "'+ req.body.style_id +'" WHERE artist_id = "'+ req.params.id+'"')
      .then(([rows, fields]) => {
        res.json(rows)
      })
      .catch(console.error)
      .then( () => connection.end());
    } else {
      validationError(error, res, next);
    }
  } else {
    validationError(error, res, next);
  }
});

// set artist as verified
router.put('/:id/verify', isLoggedIn, isAdmin, (req, res, next) => {
  const { error } = idSchema.validate({id: req.params.id});
  if (error === undefined) {
    connection = createDBConnection();
    connection.promise().query('UPDATE `Artists` SET artist_validated = "1" WHERE artist_id = "'+ req.params.id+'"')
    .then(([rows, fields]) => {
      res.json(rows)
    })
    .catch(console.error)
    .then( () => connection.end());
  } else {
    validationError(error, res, next);
  }
});

// set artist as not verified
router.put('/:id/unverify', isLoggedIn, isAdmin, (req, res, next) => {
  const { error } = idSchema.validate({id: req.params.id});
  if (error === undefined) {
    connection = createDBConnection();
    connection.promise().query('UPDATE `Artists` SET artist_validated = "0" WHERE artist_id = "'+ req.params.id+'"')
    .then(([rows, fields]) => {
      res.json(rows)
    })
    .catch(console.error)
    .then( () => connection.end());
  } else {
    validationError(error, res, next);
  }
});

// DELETE routes
// DELETE artist with id = :id
router.delete('/:id', isLoggedIn, isOwnerOrAdmin, (req, res, next) => {

  const { error } = idSchema.validate({id: req.params.id});
  if ( error === undefined ) {
    connection = createDBConnection();
    connection.promise().query('DELETE FROM `Artists` WHERE artist_id = "'+ req.params.id +'"')
    .then(([rows, fields]) => {
      res.json(rows)
    })
    .catch(console.error)
    .then( () => connection.end());
  } else {
    validationError(error, res, next);
  }
});

module.exports = router;