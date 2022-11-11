require('dotenv').config();
const express = require('express');
const morgan = require('morgan'); 
const cors = require('cors');
const path = require('path');
const http = require('http');

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
	console.log(socket.id);
	socket.on('chat message', (msg) => {
		io.emit('chat message', (msg));
	});
});

const port = process.env.PORT || 4002;
server.listen(port, () => {
	console.log('listening on port', port);
});