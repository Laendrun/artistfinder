const express = require('express');

const { createDBConnection } = require('../../../lib/db.js');
const { reviewSchema, idSchema } = require('../../../lib/validation.js');
const { validationError, getError, putError, postError, deleteError, logDBError, dbNotFound } = require('../../../lib/utils.js');
const { resourceCreated, resourceUpdated, resourceDeleted } = require('../../../lib/utils.js');

const { isLoggedIn, isOwnerOrAdmin, isUserOrAdmin } = require('../../../middlewares/');

const router = express.Router();

// GET Routes
// GET a list of reviews
router.get('/', (req, res, next) => {
  const connection = createDBConnection();
  connection.promise().query('SELECT * FROM `Reviews`')
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

// GET review WHERE id = :id
router.get('/:id', (req, res, next) => {
  const { error } = idSchema.validate({id: req.params.id});
  if ( error === undefined ) {
    const connection = createDBConnection();
    connection.promise().query('SELECT * FROM `Reviews` WHERE review_id = ?',
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

// GET reviews WHERE artist_id = :id
router.get('/artist/:id', (req, res, next) => {
  const { error } = idSchema.validate({id: req.params.id});
  if ( error === undefined ) {
    const connection = createDBConnection();
    connection.promise().query('SELECT * FROM `Reviews` WHERE artist_id = ?', 
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

// GET reviews WHERE place_id = :id
router.get('/place/:id', (req, res, next) => {
  const { error } = idSchema.validate({id: req.params.id});
  if ( error === undefined ) {
    const connection = createDBConnection();
    connection.promise().query('SELECT * FROM `Reviews` WHERE place_id = ?', 
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
// INSERT new review
router.post('/', isLoggedIn, (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if ( error === undefined ) {
    const connection = createDBConnection();
    connection.promise().query('INSERT INTO `Reviews` (`review_id`, `review_rating`, `review_text`, `user_id`, `place_id`, `artist_id`) VALUES (NULL, ?, ?, ?, ?, ?)', 
    [ req.body.review_rating, req.body.review_text, req.body.user_id, req.body.place_id, req.body.artist_id ])
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
// UPDATE review with review_id = :id
router.put('/:id', isLoggedIn, isUserOrAdmin, (req, res, next) => {
  const { error } = idSchema.validate({id: req.params.id});
  if ( error === undefined ) {
    const { error } = reviewSchema.validate(req.body);
    if ( error === undefined ) {
      const connection = createDBConnection();
      connection.promise().query('UPDATE `Reviews` SET review_rating = ?, review_text = ?, user_id = ?, place_id = ?, artist_id = ? WHERE review_id = ?', 
      [req.body.review_rating, req.body.review_text, req.body.user_id, req.body.place_id, req.body.artist_id, req.params.id ])
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
// DELETE review with review_id = :id
router.delete('/:id', isLoggedIn, isUserOrAdmin, (req, res, next) => {
  const { error } = idSchema.validate({id: req.params.id});
  if ( error === undefined ) {
    const connection = createDBConnection();
    connection.promise().query('DELETE FROM `Reviews` WHERE review_id = ?', 
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