var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/auth.routes');
var usersRouter = require('./routes/user.routes');

var app = express();




app.use('/users', usersRouter);

module.exports = app;
