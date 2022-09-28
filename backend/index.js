require('dotenv').config();
const express = require('express');
const morgan = require('morgan'); 
const cors = require('cors');
const path = require('path');

// /API router
const api = require('./routes/api');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
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
    message: err.message
  });
}

app.use(notFound);
app.use(errorHandler);

//app.use(errorHandler);

const port = process.env.PORT || 4002;
app.listen(port, () => {
  console.log('listening on port', port);
});