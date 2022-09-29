/* Routes to "protect" :
* PUT /api/v1/types/:id
* - a user can only update a review he made
* DELETE /api/v1/types/:id
* - a user can only delete a review he made
* - admins can delete any review they want
*/
const express = require('express');

const { createDBConnection } = require('../../../lib/db.js');
const { reviewSchema, idSchema } = require('../../../lib/validation.js');
const { validationError } = require('../../../lib/utils.js');

const router = express.Router();

// GET Routes
// GET a list of reviews
router.get('/', (req, res, next) => {
  const connection = createDBConnection();
  connection.promise().query('SELECT * FROM `Reviews`')
  .then(([rows, fields]) => {
    res.json(rows);
  })
  .catch(console.log())
  .then( () => connection.end());
});

// GET review WHERE id = :id
router.get('/:id', (req, res, next) => {
  const { error } = idSchema.validate({id: req.params.id});
  if ( error === undefined ) {
    const connection = createDBConnection();
    connection.promise().query('SELECT * FROM `Reviews` WHERE review_id = "'+ req.params.id+'"')
    .then(([rows, fields]) => {
      res.json(rows);
    })
    .catch(console.log())
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
    connection.promise().query('SELECT * FROM `Reviews` WHERE artist_id = "'+ req.params.id +'"')
    .then(([rows, fields]) => {
      res.json(rows);
    })
    .catch(console.log())
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
    connection.promise().query('SELECT * FROM `Reviews` WHERE place_id = "'+ req.params.id +'"')
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
// INSERT new review
router.post('/', (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if ( error === undefined ) {
    const connection = createDBConnection();
    let values = `VALUES (NULL, "${req.body.review_rating}", "${req.body.review_text}", "${req.body.user_id}", "${req.body.place_id}", "${req.body.artist_id}")`;
    connection.promise().query('INSERT INTO `Reviews` (`review_id`, `review_rating`, `review_text`, `user_id`, `place_id`, `artist_id`) '+values)
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
// UPDATE review with review_id = :id
router.put('/:id', (req, res, next) => {
  const { error } = idSchema.validate({id: req.params.id});
  if ( error === undefined ) {
    const { error } = reviewSchema.validate(req.body);
    if ( error === undefined ) {
      const connection = createDBConnection();
      connection.promise().query('UPDATE `Reviews` SET review_rating = "'+req.body.review_rating+'", review_text = "'+req.body.review_text+'", user_id = "'+req.body.user_id+'", place_id = "'+req.body.place_id+'", artist_id = "'+req.body.artist_id+'" WHERE review_id = "'+req.params.id+'"')
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
// DELETE review with review_id = :id
router.delete('/:id', (req, res, next) => {
  const { error } = idSchema.validate({id: req.params.id});
  if ( error === undefined ) {
    const connection = createDBConnection();
    connection.promise().query('DELETE FROM `Reviews` WHERE review_id = "'+ req.params.id +'"')
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