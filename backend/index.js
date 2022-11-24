require('dotenv').config();
const express = require('express');
const morgan = require('morgan'); 
const cors = require('cors');
const path = require('path');
const http = require('http');

const { createDBConnection } = require('./routes/lib/db.js');
const { checkTokenSetUser } = require('./routes/middlewares/');

// /API router
const api = require('./routes/api');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(checkTokenSetUser);

app.use('/public', express.static(__dirname + '/public'));

app.use('/api/', api);

function notFound(req, res, next) {
	res.status(404);
	const error = new Error('Not found - ' + req.originalUrl);
	next(error);
}

function errorHandler(err, req, res, next) {
	res.status(res.statusCode || 500);
	res.json({
		message: err.message,
		status: res.statusCode,
	});
}

app.use(notFound);
app.use(errorHandler);

const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
	cors: {
	  origin: "*",
	  methods: ['GET', 'POST'],
	  allowedHeaders: "*",
	  credentials: false
	}
  });

io.on('connection', (socket) => {

	socket.on('room_msg', (msg, room_name) => {
		console.log(msg);
		const db = createDBConnection();
		db.promise().query('INSERT INTO `Messages` \
		(`message_id`, `message_content`, `message_sender`, `message_room`) \
		VALUES (NULL, ?, ?, ?)', [msg.msg, msg.sender, room_name.split(':')[1]])
		.then( () => db.end());
		io.to(room_name).emit('chat message', msg);
	});

	socket.on('join room', (room_name) => {
		socket.join(room_name);
		console.log("Socket ID: "+ socket.id +" joined room: "+room_name+".");
		//io.to(room_name).emit('chat message', 'euhg');
		socket.emit(room_name, `You joined '${room_name}'.`);
	});
});

const port = process.env.PORT || 4002;
server.listen(port, () => {
	console.log('listening on port', port);
});