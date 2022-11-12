const express = require('express');

const { createDBConnection } = require('../../../lib/db.js');
const { validationError, logDBError, getError } = require('../../../lib/utils.js');
const { idSchema } = require('../../../lib/validation')
const { isLoggedIn, isAdmin } = require('../../../middlewares');

const router = express.Router();

// GET all message from a chat_id
// GET a mesage by id
// POST a new message
// DELETE a message

router.get('/:id', isLoggedIn, isAdmin, (req, res, next) => {
	const { error } = idSchema.validate({id: req.params.id});
	if ( error === undefined ) {
		const connection = createDBConnection();
		connection.promise().query('SELECT * FROM `Messages` WHERE message_id = ?', [ req.params.id ])
		.then((rows, fields) => {
			res.json({
				message: 'Messages endpoint',
				type: 'success',
				rows
			});
		})
		.catch(error => {
			logDBError();
			getError(res, next);
		})
		.then( () => connection.end());
	} else {
		// id validation schema
		validationError(error, res, next);
	}
});

module.exports = router;