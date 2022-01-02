var express = require('express');
var path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

var createError = require('http-errors');
var cookieParser = require('cookie-parser');
var cors = require('cors');
const httpStatus = require('http-status');
const routes = require('./routes/v1');

const PORT = process.env.PORT || 3000;

var app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/v1', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

module.exports = app;
