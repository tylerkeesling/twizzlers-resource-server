var express = require('express');
var path = require('path');
const db = require('../models/index.js');
var cookieParser = require('cookie-parser');
var cors = require('cors');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const httpStatus = require('http-status');
const routes = require('./routes/v1');
const { errorConverter, errorHandler } = require('./middleware/error');
const ApiError = require('./utils/ApiError');

const PORT = process.env.PORT || 3000;

var app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/v1', routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

module.exports = app;
