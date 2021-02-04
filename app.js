var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var FlashMessages = require('connect-flash');

var indexRouter = require('./routes/index');
const studentRouter = require('./routes/studentRoute');
const gradeRouter = require('./routes/gradeRoute');
const subjectRouter = require('./routes/subjectRoute');
const sequelizeInit = require('./config/sequelize/init');
var cors = require('cors');
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
app.use(cors());


const configureI18n = require('./i18n.js');

const [i18n, _] = configureI18n(true);
app.use(i18n.init);

app.use((req, res, next) => {
    if(!res.locals.lang) {
        const currentLang = req.cookies['acme-hr-lang'];
        res.locals.lang = currentLang;
    }
    next();
});


const session = require('express-session');
const authUtils = require("./util/authUtils");
app.use(session({
    secret: 'my_secret_password',
    cookie: {maxAge: 60000},
    resave: false,
    saveUninitialized: false
}));
app.use(FlashMessages());


app.use((req, res, next) => {
    const loggedUser = req.session.loggedUser;
    res.locals.loggedUser = loggedUser;
    if(!res.locals.loginError) {
        res.locals.loginError = undefined;
    }
    next();
});

app.use('/', indexRouter);
app.use('/student', studentRouter);
app.use('/grade', authUtils.permitAuthenticatedUser, gradeRouter);
app.use('/subject', subjectRouter);
app.use('/admin', authUtils.permitAuthenticatedUserRole_ADMIN, subjectRouter);

app.use('/student/edit', authUtils.permitAuthenticatedUserRole_TEACHER, studentRouter);
app.use('/grade/edit', authUtils.permitAuthenticatedUserRole_TEACHER, gradeRouter);
app.use('/subject/edit',authUtils.permitAuthenticatedUserRole_TEACHER, subjectRouter);
app.use('/student/add', authUtils.permitAuthenticatedUserRole_TEACHER, studentRouter);
app.use('/grade/add', authUtils.permitAuthenticatedUserRole_TEACHER, gradeRouter);
app.use('/subject/add',authUtils.permitAuthenticatedUserRole_TEACHER, subjectRouter);
app.use('/student/delete', authUtils.permitAuthenticatedUserRole_TEACHER, studentRouter);
app.use('/grade/delete', authUtils.permitAuthenticatedUserRole_TEACHER, gradeRouter);
app.use('/subject/delete',authUtils.permitAuthenticatedUserRole_TEACHER, subjectRouter);


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
