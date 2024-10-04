var createError = require('http-errors');
var express = require('express');
const cors = require('cors'); // Import the cors package
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var searchRouter = require('./routes/search');
var insertRouter = require('./routes/insert');
var accountRouter = require('./routes/account');
var csvRouter = require('./routes/csv');
var editRouter = require('./routes/edit');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('port', 4000);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Use CORS middleware
app.use(cors({
  origin: 'http://localhost:3000', // Update this with your frontend URL
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

app.use('/', indexRouter);
app.use('/', searchRouter);
app.use('/', insertRouter);
app.use('/', accountRouter);
app.use('/', csvRouter);
app.use('/', editRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(app.get('port'), () => {
  console.log(`Server running on port ${app.get('port')}`);
});

module.exports = app;
