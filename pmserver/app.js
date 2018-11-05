var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors  = require('cors');

var databaseConfig = require('./config/database');

var index = require('./routes/index');
var orders = require('./routes/orders');
var Protected = require('./routes/protected');
var users_protected = require('./routes/users_protected');
var items = require('./routes/items');
var Public = require('./routes/public');
var users_public = require('./routes/users_public');
var trips = require('./routes/trips');
var addresses = require('./routes/addresses');
var search_function = require('./routes/search');

var app = express();

//Set up mongoose connection
var databaseUrl = databaseConfig.dev;
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

//var allowedOrigins = ['http://localhost:3000', 'http://localhost:4200', 'https://primor-prod.herokuapp.com'];
//app.use(cors({
//	origin: function(origin, callback) {
//		if (!origin) return callback(null, true);
//		if (allowedOrigins.indexOf(origin) === -1) {
//			var msg = 'The CORS policy for this site does not ' +
//                'allow access from the specified Origin.';
//			return callback(new Error(msg), false);
//		}
//		return callback(null, true);
//	}
//}));

app.use(cors());

//app.use(function(req, res, next) {
//  res.header("Access-Control-Allow-Origin", "*");
//  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//  next();
//});

app.use('/', index);

app.use('/public', Public);
app.use('/protected', Protected);

app.use('/public/users', users_public);
app.use('/protected/users', users_protected);

app.use('/protected/orders', orders);
app.use('/protected/items', items);

app.use('/protected/trips', trips);
app.use('/protected/addresses', addresses);
app.use('/public/search', search_function);

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
