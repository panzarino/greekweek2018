var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//var index = require('./routes/index');
var api = require('./routes/api');

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//Session
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'ABCDEF'
}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());



//Database Setup
var dbconfig = require('./database.config.json');
var mysql = require('mysql');
var conn = mysql.createConnection({
    host: 'localhost',
    user: dbconfig.username,
    password: dbconfig.password,
    database: 'gw2018'
});
conn.connect(function(err) {
    if(err) {
        console.err('Error Connecting to SQL');
    } else {
        console.log('Connected to SQL');
    }
});

app.use('/api', function(req, res, next) {
    req.conn = conn;
    next();
});

app.use('/api', api);

app.use(express.static('../template')); //path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

module.exports = app;
