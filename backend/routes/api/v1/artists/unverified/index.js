const express = require('express');

const { createDBConnection } = require('../../../../lib/db.js');
const { idSchema, nameSchema } = require('../../../../lib/validation.js');
const { validationError, getError, logDBError, dbNotFound } = require('../../../../lib/utils.js');

const { isOwnerOrAdmin, isAdmin } = require('../../../../middlewares/');

const router = express.Router();

// GET routes 
// GET all artists
router.get('/', isAdmin, (req, res, next) => {
  const connection = createDBConnection();
  connection.promise().query('SELECT * FROM `Artists` WHERE `artist_validated` = "0"')
  .then(([rows, field]) => {
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

// GET all groups
router.get('/groups/', isAdmin, (req, res, next) => {
  const connection = createDBConnection();
  connection.promise().query('SELECT * FROM `Artists` WHERE `artist_isGroup` = true AND `artist_validated` = "0"')
  .then(([rows, field]) => {
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

// GET all notGroups
router.get('/notGroups/', isAdmin, (req, res, next) => {
  const connection = createDBConnection();
  connection.promise().query('SELECT * FROM `Artists` WHERE `artist_isGroup` = false AND `artist_validated` = "0"')
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

// GET all artists by type_id
router.get('/type/:type_id', isAdmin, (req, res, next) => {
  const { error } = idSchema.validate({id : req.params.type_id});
  if (error === undefined) {
    const connection = createDBConnection();
    connection.promise().query('SELECT * FROM `Artists` WHERE Artists.type_id = ' + req.params.type_id + ' AND `artist_validated` = "0"')
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

// GET all artists where type name LIKE :name
router.get('/type/name/:name', isAdmin, (req, res, next) => {
  const { error } = nameSchema.validate({name: req.params.name});

  if (error === undefined) {
    const connection = createDBConnection();
    connection.promise().query('SELECT * FROM `Artists` INNER JOIN `Types` ON Artists.type_id = Types.type_id WHERE Types.type_name LIKE \'%'+req.params.name+'%\' AND `artist_validated` = "0"')
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

// GET artist by :ID
router.get('/:id', isOwnerOrAdmin, (req, res, next) => {
  const { error } = idSchema.validate({id: req.params.id});
  if (error === undefined){
    const connection = createDBConnection();
    connection.promise().query('SELECT * FROM `Artists` WHERE Artists.artist_id = "'+ req.params.id +'" AND `artist_validated` = "0"')
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

// GET all artists where name LIKE :name
router.get('/name/:name', isAdmin, (req, res, next) => {
  
  const { error } = nameSchema.validate({name: req.params.name});
  if (error === undefined){
    const connection = createDBConnection();
    connection.promise().query('SELECT * FROM `Artists` WHERE Artists.artist_name LIKE \'%'+req.params.name+'%\' AND `artist_validated` = "0"')
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

module.exports = router;