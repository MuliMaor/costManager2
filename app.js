// Nir Chen - 303341721
// Shmuel Maor - 206828360

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const aboutRouter = require('./routes/about');
const addcostRouter = require('./routes/addcost');
const reportRouter = require('./routes/report');

const app = express();

const connection = async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect("mongodb+srv://fogen13:M1o2n3g4o5@cluster0.gjeb4au.mongodb.net/?retryWrites=true&w=majority");
        //"mongodb+srv://fogen13:M1o2n3g4o5@cluster0.zfsstns.mongodb.net/?retryWrites=true&w=majority");
    console.log("connection successful!");
  } catch (error) {
    console.log(error);
  }
};
connection();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/about', aboutRouter);
app.use('/addcost', addcostRouter);
app.use('/report', reportRouter);

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
