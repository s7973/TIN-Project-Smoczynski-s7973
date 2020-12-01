var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
const studentRouter = require('./routes/studentRoute');
const gradeRouter = require('./routes/gradeRoute');
const subjectRouter = require('./routes/subjectRoute');
const studentApiRouter = require('./routes/api/StudentApiRoute');
const subjectApiRouter = require('./routes/api/SubjectApiRoute');
const gradeApiRouter = require('./routes/api/GradeApiRoute');
const studentRoute = require('./routes/studentRoute');
const sequelizeInit = require('./config/sequelize/init');
sequelizeInit()
    .catch(err => {
      console.log(err);
    });

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/student', studentRouter);
app.use('/grade', gradeRouter);
app.use('/subject', subjectRouter);
app.use('/api/students', studentApiRouter);
app.use('/api/subjects', subjectApiRouter);
app.use('/api/grades', gradeApiRouter);
app.use('/students', studentRoute);
app.use('/students/details', studentRoute);

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
