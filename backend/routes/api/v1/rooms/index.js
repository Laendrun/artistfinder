const express = require('express');

const { createDBConnection } = require('../../../lib/db.js');
const { validationError, logDBError, getError, postError, dbNotFound } = require('../../../lib/utils.js');
const { resourceCreated, resourceUpdated } = require('../../../lib/utils.js');
const { idSchema, roomsSchema, dateSchema } = require('../../../lib/validation')
const { isLoggedIn, isAdmin } = require('../../../middlewares');

const router = express.Router();

router.get('/', isLoggedIn, isAdmin, (req, res, next) => {
	const connection = createDBConnection();
	connection.promise().query('\
	SELECT \
	Rooms.rooms_id, Rooms.rooms_created, Rooms.rooms_closed, Rooms.rooms_user_1, \
	Rooms.rooms_user_2, a.user_username as room_user_1_username, \
	b.user_username as room_user_2_username \
	FROM `Rooms` LEFT JOIN `Users` a \
	ON a.user_id = Rooms.rooms_user_1 \
	LEFT JOIN `Users` b \
	ON b.user_id = Rooms.rooms_user_2\
	')
	.then((rows, fields) => {
		res.json({
			rooms: rows[0]
		})
	})
	.catch(error => {
		logDBError(error);
		getError(res, next);
	})
	.then( () => connection.end());
});

// Get rooms by user id
router.get('/user/:id', isLoggedIn, isAdmin, (req, res, next) => {
	const { error } = idSchema.validate({id: req.params.id});
	if ( error === undefined ) {
		const connection = createDBConnection();
		connection.promise().query('\
		SELECT \
		Rooms.rooms_id, Rooms.rooms_created, Rooms.rooms_closed, Rooms.rooms_user_1, \
		Rooms.rooms_user_2, a.user_username as room_user_1_username, \
		b.user_username as room_user_2_username \
		FROM `Rooms` LEFT JOIN `Users` a \
		ON a.user_id = Rooms.rooms_user_1 \
		LEFT JOIN `Users` b \
		ON b.user_id = Rooms.rooms_user_2\
		WHERE Rooms.rooms_user_1 = ? OR Rooms.rooms_user_2 = ? \
		', [req.params.id, req.params.id])
		.then((rows, fields) => {
			res.json({
				rooms: rows[0]
			});
		})
		.catch(error => {
			logDBError(error);
			getError(res, next);
		})
		.then( () => connection.end());
	} else {
		// id validation error 
		validationError(error, res, next);
	}
});

// Get all the rooms of a loggedin user
router.get('/user/', isLoggedIn, (req, res, next) => {
	const connection = createDBConnection();
	connection.promise().query('\
	SELECT \
	Rooms.rooms_id, Rooms.rooms_created, Rooms.rooms_closed, Rooms.rooms_user_1, \
	Rooms.rooms_user_2, a.user_username as room_user_1_username, \
	b.user_username as room_user_2_username \
	FROM `Rooms` LEFT JOIN `Users` a \
	ON a.user_id = Rooms.rooms_user_1 \
	LEFT JOIN `Users` b \
	ON b.user_id = Rooms.rooms_user_2\
	WHERE (Rooms.rooms_user_1 = ? OR Rooms.rooms_user_2 = ?) AND Rooms.rooms_closed IS NULL \
	', [req.user.user_id, req.user.user_id])
	.then((rows, fields) => {
		res.json({
			rooms: rows[0]
		});
	})
	.catch(error => {
		logDBError(error);
		getError(res, next);
	})
	.then( () => connection.end());
})

// Insert a new room
router.post('/', isLoggedIn, (req, res, next) => {
	const { error } = roomsSchema.validate(req.body);
	if ( error === undefined ) {
		const connection = createDBConnection();
		req.body.rooms_closed ?  req.body.rooms_closed : null;
		connection.promise().query('INSERT INTO `Rooms` \
		(`rooms_id`, `rooms_created`, `rooms_closed`, `rooms_user_1`, `rooms_user_2`) \
		VALUES \
		(NULL, ?, ?, ?, ?)', 
		[req.body.rooms_created, req.body.rooms_closed, req.body.rooms_user_1, req.body.rooms_user_2])
		.then((rows, fields) => {
			if (rows.affectedRows != 0) {
				resourceCreated(res, rows.insertId);
			  } else {
				dbNotFound(res, next);
			  }
		})
		.catch(error => {
			logDBError(error);
			postError(res, next);
		})
		.then( () => connection.end());
	} else {
		// rooms validation error
		validationError(error, res, next);
	}
});

// Close a room by id (PUT)
router.put('/:id/close', isLoggedIn, isAdmin, (req, res, next) => {
	const { error } = idSchema.validate({id: req.params.id });
	if ( error === undefined ) {
		const { error } = dateSchema.validate({date: req.body.rooms_closed});
		if ( error === undefined ) {
			const connection = createDBConnection();
			connection.promise().query('UPDATE `Rooms` SET Rooms.rooms_closed = ? \
			WHERE Rooms.rooms_id = ?', 
			[req.body.rooms_closed, req.params.id])
			.then((rows, fields) => {
				if (rows.affectedRows != 0){
					resourceUpdated(res, req.params.id);
				} else {
					dbNotFound(res, next);
				}
			})
			.catch(error => {
				logDBError(error);
				putError();
			})
			.then( () => connection.end());
		} else {
			// date validation error 
			validationError(error, res, next);
		}
	} else {
		// ID validation error
		validationError(error, res, next);
	}
});

// Reopen a room by id
router.put('/:id/open', isLoggedIn, isAdmin, (req, res, next) => {
	const { error } = idSchema.validate({id: req.params.id });
	if ( error === undefined ) {
		const connection = createDBConnection();
		connection.promise().query('UPDATE `Rooms` SET Rooms.rooms_closed = NULL \
		WHERE Rooms.rooms_id = ?', 
		[req.body.rooms_closed, req.params.id])
		.then((rows, fields) => {
			if (rows.affectedRows != 0){
				resourceUpdated(res, req.params.id);
			} else {
				dbNotFound(res, next);
			}
		})
		.catch(error => {
			logDBError(error);
			putError();
		})
		.then( () => connection.end());
	} else {
		// ID validation error
		validationError(error, res, next);
	}
});

// delete room where id = :id
router.delete('/:id', isLoggedIn, isAdmin, (req, res, next) => {
	const { error } = idSchema.validate({id: req.params.id});
	if ( error === undefined ) {
		const connection = createDBConnection();
		connection.promise().query('DELETE FROM `Rooms` WHERE Rooms.rooms_id = ?', 
		[req.params.id])
		.then((rows, fields) => {
			if (rows.affectedRows != 0) {
				resourceUpdated(res, req.params.id);
			} else {
				dbNotFound(res, next);
			}
		})
	} else {
		// id validation error
		validationError(error, res, next);
	}
})

module.exports = router;

/*
	SELECT 
	rooms_id,
	rooms_created,
	rooms_closed,
	rooms_sender, 
	rooms_receiver,
	sender.user_username as room_sender_username,
	receiver.user_username as room_receiver_username
	FROM Rooms
	LEFT JOIN Users sender
	ON sender.user_id = Rooms.rooms_sender
	LEFT JOIN Users receiver
	ON receiver.user_id = Rooms.rooms_receiver
	WHERE rooms_sender = 28 OR rooms_receiver = 28
*/