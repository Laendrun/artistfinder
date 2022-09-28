//require('dotenv').config();
const express = require('express');
const morgan = require('morgan'); 
const cors = require('cors');
const path = require('path');

// /API router
const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use('/public', express.static(__dirname + '/public'));

function notFound(req, res, next) {
  res.status(404);
  const error = new Error('Not found - ' + req.originalUrl);
  next(error);
}

function errorHandler(err, req, res, next) {
  res.status(res.statusCode || 500);
  res.json({
    message: err.message
  });
}

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '/html/index.html'));
});

app.get('/artists/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '/html/artists.html'));
});

app.get('/photographs/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '/html/photographs.html'));
});

app.get('/musicians/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '/html/musicians.html'));
});

app.get('/future-events/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '/html/future-events.html'));
});

app.get('/login/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '/html/login.html'));
});

app.get('/signup/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '/html/signup.html'));
});

app.use(notFound);
app.use(errorHandler);

//app.use(errorHandler);

const port = process.env.PORT || 4003;
app.listen(port, () => {
  console.log('listening on port', port);
});