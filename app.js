var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const locationRouter = require('./routes/location');
const bookRouter = require('./routes/books');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection
//Mongoose Connection Setup
mongoose.connect(keys.mongodb.dev, {
    promiseLibrary: require('bluebird'),
    useNewUrlParser: true
  })
  .then(() => console.log('Connection Successful'))
  .catch((err) => console.log(err));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/location', locationRouter);
app.use('/books', bookRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;