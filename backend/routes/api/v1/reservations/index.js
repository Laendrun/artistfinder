/* Routes to "protect" :
* Basically, for the reservations, only the system will be able to post new reservations, before saving them, it has to be
* accepted by both parties (place + artist). If one of both doesn't accept the reservation, the reservation will not be 
* published.
* PUT /api/v1/reservations/:id
* To update a reservation, it will work like inserting a new one, only the system will be able to do it and updates to the 
* reservations have to be accepted by both parties.
* - admins can update any reservations
* POST /api/v1/types
* To insert new reservation, it will be done as said before, only the system will be able to do it and it has to be
* accepted by both parties
* - admins can insert new reservations manually
* DELETE /api/v1/types/:id
* To delete a reservation, only the system will be able to do it as well. 
* The cancellation of the event has not to be accepted by both parties but when one of the parties cancels, it has to leave
* a message explaining why it was cancelled
* - admins can cancel any reservation they want if they need to.
*/

const express = require('express');

const { createDBConnection } = require('../../../lib/db.js');
const { idSchema, dateSchema, nameSchema, reservationSchema } = require('../../../lib/validation.js');
const { validationError } = require('../../../lib/utils.js');

const router = express.Router();

// GET routes
// GET all reservations
router.get('/', (req, res, next) => {
  const connection = createDBConnection();
  connection.promise().query('SELECT * FROM `Reservations`')
  .then(([rows, fields]) => {
    res.json(rows);
  })
  .catch(console.log())
  .then( () => connection.end());
});

// GET reservation where reservation_id = :id
router.get('/:id', (req, res, next) => {
  const { error } = idSchema.validate({id: req.params.id});
  if ( error === undefined ) {
    const connection = createDBConnection();
    connection.promise().query('SELECT * FROM `Reservations` WHERE reservation_id = "'+ req.params.id +'"')
    .then(([rows, fields]) => {
      res.json(rows);
    })
    .catch(console.log())
    .then( () => connection.end());
  } else {
    validationError(error, res, next);
  }
});

// GET reservations where reservation_date = :date
router.get('/date/is/:date', (req, res, next) => {
  const { error } = dateSchema.validate({date: req.params.date});
  if ( error === undefined ) {
    const connection = createDBConnection();
    connection.promise().query('SELECT * FROM `Reservations` WHERE reservation_date = "'+ req.params.date +'"')
    .then(([rows, fields]) => {
      res.json(rows);
    })
    .catch(console.log())
    .then( () => connection.end());
  } else {
    validationError(error, res, next);
  }
});

// GET reservations where reservation_date >= :date
router.get('/date/after/:date', (req, res, next) => {
  const { error } = dateSchema.validate({date: req.params.date});
  if ( error === undefined ) {
    const connection = createDBConnection();
    connection.promise().query('SELECT * FROM `Reservations` WHERE reservation_date >= "'+ req.params.date +'"')
    .then(([rows, fields]) => {
      res.json(rows);
    })
    .catch(console.log())
    .then( () => connection.end());
  } else {
    validationError(error, res, next);
  }
});

// GET reservations where reservation_date <= :date
router.get('/date/before/:date', (req, res, next) => {
  const { error } = dateSchema.validate({date: req.params.date});
  if ( error === undefined ) {
    const connection = createDBConnection();
    connection.promise().query('SELECT * FROM `Reservations` WHERE reservation_date <= "'+ req.params.date +'"')
    .then(([rows, fields]) => {
      res.json(rows);
    })
    .catch(console.log())
    .then( () => connection.end());
  } else {
    validationError(error, res, next);
  }
});

// GET reservations where artist_id = :id
router.get('/artist/:id', (req, res, next) => {
  const { error } = idSchema.validate({id: req.params.id});
  if ( error === undefined ) {
    const connection = createDBConnection();
    connection.promise().query('SELECT * FROM `Reservations` WHERE artist_id = "'+ req.params.id +'"')
    .then(([rows, fields]) => {
      res.json(rows);
    })
    .catch(console.log())
    .then( () => connection.end());
  } else {
    validationError(error, res, next);
  }
});

// GET reservations where artist_name LIKE :name
router.get('/artist/name/:name', (req, res, next) => {
  const { error } = nameSchema.validate({name: req.params.name});
  if ( error === undefined ) {
    const connection = createDBConnection();
    connection.promise().query('SELECT * FROM `Reservations` INNER JOIN `Artists` ON Reservations.artist_id = Artists.artist_id WHERE Artists.artist_name LIKE "%'+ req.params.name +'%"')
    .then(([rows, fields]) => {
      res.json(rows);
    })
    .catch(console.log())
    .then( () => connection.end());
  } else {
    validationError(error, res, next);
  }
});

// GET reservations where place_id = :id
router.get('/place/:id', (req, res, next) => {
  const { error } = idSchema.validate({id: req.params.id});
  if ( error === undefined ) {
    const connection = createDBConnection();
    connection.promise().query('SELECT * FROM `Reservations` WHERE place_id = "'+ req.params.id +'"')
    .then(([rows, fields]) => {
      res.json(rows);
    })
    .catch(console.log())
    .then( () => connection.end());
  } else {
    validationError(error, res, next);
  }
});

// GET reservations where place_name LIKE :name
router.get('/place/name/:name', (req, res, next) => {
  const { error } = nameSchema.validate({name: req.params.name});
  if ( error === undefined ) {
    const connection = createDBConnection();
    connection.promise().query('SELECT * FROM `Reservations` INNER JOIN `Places` ON Reservations.place_id = Places.place_id WHERE Places.place_name LIKE "%'+ req.params.name +'%"')
    .then(([rows, fields]) => {
      res.json(rows);
    })
    .catch(console.log())
    .then( () => connection.end());
  } else {
    validationError(error, res, next);
  }
});

// GET reservations where category_id = :id
router.get('/category/:id', (req, res, next) => {
  const { error } = idSchema.validate({id: req.params.id});
  if ( error === undefined ) {
    const connection = createDBConnection();
    connection.promise().query('SELECT * FROM `Reservations` WHERE category_id = "'+ req.params.id + '"')
    .then(([rows, fields]) => {
      res.json(rows);
    })
    .catch(console.log())
    .then( () => connection.end());
  } else {
    validationError(error, res, next);
  }
});

// GET reservations where category_name LIKE :name
router.get('/category/name/:name', (req, res, next) => {
  const { error } = nameSchema.validate({name: req.params.name});
  if ( error === undefined ) {
    const connection = createDBConnection();
    connection.promise().query('SELECT * FROM `Reservations` INNER JOIN `Categories` ON Reservations.category_id = Categories.category_id WHERE Categories.category_name LIKE "%'+ req.params.name +'%"')
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
// POST new reservation
router.post('/', (req, res, next) => {
  const { error } = reservationSchema.validate(req.body);
  if ( error === undefined ) {
    const connection = createDBConnection();
    const values = `VALUES (NULL, "${req.body.reservation_date}", "${req.body.reservation_time}", "${req.body.place_id}", "${req.body.artist_id}", "${req.body.category_id}")`;
    connection.promise().query('INSERT INTO `Reservations` (`reservation_id`, `reservation_date`, `reservation_time`, `place_id`, `artist_id`, `category_id`) '+values)
    .then(([rows, fields]) => {
      res.json(rows);
    })
    .catch(console.log())
    .then( () => connection.end());
  } else {
    validationError(error, res, next);
  }
});

// PUT routes
// UPDATE reservation with reservation_id = :id
router.put('/:id', (req, res, next) => {
  const { error } = idSchema.validate({id: req.params.id});
  if ( error === undefined ) {
    const { error } = reservationSchema.validate(req.body);
    if ( error === undefined ) {
      const connection = createDBConnection();
      connection.promise().query('UPDATE `Reservations` SET reservation_date = "'+req.body.reservation_date+'", reservation_time = "'+req.body.reservation_time+'", place_id = "'+req.body.place_id+'", artist_id = "'+req.body.artist_id+'", category_id = "'+req.body.category_id+'" WHERE reservation_id = "'+ req.params.id +'"')
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

// DELETE routes
// DELETE reservation with reservation_id = :id
router.delete('/:id', (req, res, next) => {
  const { error } = idSchema.validate({id: req.params.id});
  if ( error === undefined ) {
    const connection = createDBConnection();
    connection.promise().query('DELETE FROM `Reservations` WHERE reservation_id = "'+req.params.id+'"')
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