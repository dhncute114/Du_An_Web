var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var taikhoanRouter = require('./routes/taikhoan');
var quanlyRouter = require('./routes/quanly');
var nhanvienRouter = require('./routes/nhanvien');
var bodyParser = require('body-parser')
var session = require('express-session')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'dsfsdfsdfsdfsdf',
  resave: false,
  saveUninitialized: true,
}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use('/', taikhoanRouter);
app.use('/nhanvien', nhanvienRouter);
app.use('/quanly', quanlyRouter);

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

module.exports = app;
