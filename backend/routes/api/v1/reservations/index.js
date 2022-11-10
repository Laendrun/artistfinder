const express = require('express');

const { createDBConnection } = require('../../../lib/db.js');
const { idSchema, dateSchema, nameSchema, reservationSchema } = require('../../../lib/validation.js');
const { validationError, getError, putError, postError, deleteError, logDBError, dbNotFound } = require('../../../lib/utils.js');
const { resourceCreated, resourceUpdated, resourceDeleted } = require('../../../lib/utils.js');

const router = express.Router();

const select = 'Reservations.reservation_id, Reservations.reservation_date, Reservations.reservation_time, Places.place_id, Places.place_name, Categories.category_id, Categories.category_name';
let request = 'SELECT ' + select + ' FROM `Reservations` INNER JOIN `Places` ON Reservations.place_id = Places.place_id';
request += ' INNER JOIN `Categories` ON Reservations.category_id = Categories.category_id'

// GET routes
// GET all reservations
router.get('/', (req, res, next) => {
	const connection = createDBConnection();
  connection.promise().query(request)
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

// GET reservation where reservation_id = :id
router.get('/:id', (req, res, next) => {
  const { error } = idSchema.validate({id: req.params.id});
  if ( error === undefined ) {
    const connection = createDBConnection();
	request += ' WHERE reservation_id = ?'
    connection.promise().query(request, [ req.params.id ])
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

// GET reservations where reservation_date = :date
router.get('/date/is/:date', (req, res, next) => {
  const { error } = dateSchema.validate({date: req.params.date});
  if ( error === undefined ) {
    const connection = createDBConnection();
	request += ' WHERE reservation_date = ?'
    connection.promise().query(request, [ req.params.date ])
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

// GET reservations where reservation_date >= :date
router.get('/date/after/:date', (req, res, next) => {
  const { error } = dateSchema.validate({date: req.params.date});
  if ( error === undefined ) {
    const connection = createDBConnection();
	request += ' WHERE reservation_date >= ?'
    connection.promise().query(request, [ req.params.date ])
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

// GET reservations where reservation_date <= :date
router.get('/date/before/:date', (req, res, next) => {
  const { error } = dateSchema.validate({date: req.params.date});
  if ( error === undefined ) {
    const connection = createDBConnection();
	request += ' WHERE reservation_date <= ?'
    connection.promise().query(request, [ req.params.date ])
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

// GET reservations where artist_id = :id
router.get('/artist/:id', (req, res, next) => {
  const { error } = idSchema.validate({id: req.params.id});
  if ( error === undefined ) {
    const connection = createDBConnection();
    connection.promise().query('SELECT '+ select +' FROM `Reservations` INNER JOIN `Places` ON Reservations.place_id = Places.place_id  INNER JOIN `Categories` ON Reservations.category_id = Categories.category_id WHERE Reservations.artist_id = '+ req.params.id)
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

// GET reservations where artist_name LIKE :name
router.get('/artist/name/:name', (req, res, next) => {
  const { error } = nameSchema.validate({name: req.params.name});
  if ( error === undefined ) {
	const connection = createDBConnection();
	let sql = 'SELECT Reservations.reservation_id, Reservations.reservation_date, Reservations.reservation_time, Places.place_id, Places.place_name, Categories.category_id, Categories.category_name FROM `Reservations`';
		sql += ' INNER JOIN `Places` ON Reservations.place_id = Places.place_id INNER JOIN `Categories` ON Reservations.category_id = Categories.category_id INNER JOIN `Artists` ON Reservations.artist_id = Artists.artist_id';
		sql += ' WHERE Artists.artist_name LIKE "%'+ req.params.name +'%"';
	connection.promise().query(sql)
	.then(([rows, fields]) => {
      if (rows.length != 0) {
        res.json(rows);
      } else {
        res.json({
			rows: rows,
			fields: fields
		})
		//dbNotFound(res, next);
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

// GET reservations where place_id = :id
router.get('/place/:id', (req, res, next) => {
  const { error } = idSchema.validate({id: req.params.id});
  if ( error === undefined ) {
	const connection = createDBConnection();
	connection.promise().query('SELECT '+ select +' FROM `Reservations` INNER JOIN Places ON Reservations.place_id = Places.place_id INNER JOIN Categories ON Reservations.category_id = Categories.category_id WHERE Reservations.place_id = ?', [ req.params.id ])
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

// GET reservations where place_name LIKE :name
router.get('/place/name/:name', (req, res, next) => {
  const { error } = nameSchema.validate({name: req.params.name});
  if ( error === undefined ) {
    const connection = createDBConnection();
    connection.promise().query('SELECT '+ select +' FROM `Reservations` INNER JOIN `Places` ON Reservations.place_id = Places.place_id INNER JOIN Categories ON Reservations.category_id = Categories.category_id WHERE Places.place_name LIKE "%'+ req.params.name +'%"', 
    [ req.params.name ])
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

// GET reservations where category_id = :id
router.get('/category/:id', (req, res, next) => {
  const { error } = idSchema.validate({id: req.params.id});
  if ( error === undefined ) {
    const connection = createDBConnection();
    connection.promise().query('SELECT '+ select +' FROM `Reservations` INNER JOIN Places ON Reservations.place_id = Places.place_id INNER JOIN Categories ON Reservations.category_id = Categories.category_id WHERE Reservations.category_id = ?', 
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

// GET reservations where category_name LIKE :name
router.get('/category/name/:name', (req, res, next) => {
  const { error } = nameSchema.validate({name: req.params.name});
  if ( error === undefined ) {
    const connection = createDBConnection();
    connection.promise().query('SELECT '+ select +' FROM `Reservations` INNER JOIN `Categories` ON Reservations.category_id = Categories.category_id INNER JOIN Places ON Reservations.place_id = Places.place_id WHERE Categories.category_name LIKE "%'+ req.params.name +'%"')
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

// POST routes
// POST new reservation
router.post('/', (req, res, next) => {
  const { error } = reservationSchema.validate(req.body);
  if ( error === undefined ) {
    const connection = createDBConnection();
    connection.promise().query('INSERT INTO `Reservations` (`reservation_id`, `reservation_date`, `reservation_time`, `place_id`, `artist_id`, `category_id`) VALUES (NULL, ?, ?, ?, ?, ?)', 
    [ req.body.reservation_date, req.body.reservation_time, req.body.place_id, req.body.artist_id, req.body.category_id ])
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

// PUT routes
// UPDATE reservation with reservation_id = :id
router.put('/:id', (req, res, next) => {
  const { error } = idSchema.validate({id: req.params.id});
  if ( error === undefined ) {
    const { error } = reservationSchema.validate(req.body);
    if ( error === undefined ) {
      const connection = createDBConnection();
      connection.promise().query('UPDATE `Reservations` SET reservation_date = ?, reservation_time = ?, place_id = ?, artist_id = ?, category_id = ? WHERE reservation_id = ?', 
      [ req.body.reservation_date, req.body.reservation_time, req.body.place_id, req.body.artist_id, req.body.category_id, req.params.id ])
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

// DELETE routes
// DELETE reservation with reservation_id = :id
router.delete('/:id', (req, res, next) => {
  const { error } = idSchema.validate({id: req.params.id});
  if ( error === undefined ) {
    const connection = createDBConnection();
    connection.promise().query('DELETE FROM `Reservations` WHERE reservation_id = ?', 
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