var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
/// pârtie mta3 importation:
const { connectToMongoDb } = require("./config/db");
require("dotenv").config();
const http = require('http'); //1 // awil 7aja 3malit importation

var indexRouter = require('./routes/indexRouter');//3andi dossier routes fih D. indexRouter
var usersRouter = require('./routes/usersRouter');//3andi dossier routes fih D. usersRouter
var osRouter = require('./routes/osRouter');//3andi dossier routes fih D. osRouter

var app = express();



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);// tab3a index ' http://localhost:5000/ '
app.use('/users', usersRouter);//tab3a users ' http://localhost:5000/users '
app.use('/os', osRouter);
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

const server = http .createServer(app); //nasna3 server //2
server.listen(process.env.port,() => {
  connectToMongoDb(),
  console.log("app is running on port 5000 ");
});