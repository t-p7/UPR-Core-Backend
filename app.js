// var createError = require('http-errors');
// var express = require('express');
// const sql = require("./db");
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var searchRouter = require('./routes/search');
// var insertRouter = require('./routes/insert');
// var accountRouter = require('./routes/account');



// var app = express();


// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
// app.set('port', 4000);

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/', searchRouter);
// app.use('/', insertRouter);
// app.use('/', accountRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// app.use((req, res, next) =>{
// 	sql = pg('postgres://postgres:admin@localhost:5432/UPR-Core');
// 	next();
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// app.listen(app.get('port'));

// module.exports = app;




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
