var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


var index = require('./routes/index');
var orders = require('./routes/orders');
var Protected = require('./routes/protected');
var users_protected = require('./routes/users_protected');
var items = require('./routes/items');
var Public = require('./routes/public');
var users_public = require('./routes/users_public');

var app = express();

//Set up mongoose connection
var databaseUrl = 'mongodb://tnlong1997:bdragon7125..@ds041404.mlab.com:41404/primor';
//databaseUrl = 'mongodb://localhost:27017';
var mongoDB = databaseUrl;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '-i');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/orders', orders);
app.use('/protected', Protected);
app.use('/protected/users', users_protected);
app.use('/public', Public);
app.use('/public/users', users_public);
app.use('/items', items);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function(err, req, res) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
