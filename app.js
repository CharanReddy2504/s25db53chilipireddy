// =======================================
//         Module Imports
// =======================================
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const createError = require('http-errors');
require('dotenv').config();

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const Account = require('./models/account');

// =======================================
//         Initialize Express App
// =======================================
const app = express();

// =======================================
//         Database Connection
// =======================================
const connectionString = process.env.MONGO_CON;

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});

// =======================================
//         View Engine Setup
// =======================================
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// =======================================
//         Middleware
// =======================================
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

// =======================================
//         Passport Configuration
// =======================================
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// =======================================
//         Route Handlers
// =======================================
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const resourceRouter = require('./routes/resource');
const gridRouter = require('./routes/grid');
const pickRouter = require('./routes/pick');
const crystalRouter = require('./routes/crystal');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/resource', resourceRouter);
app.use('/grid', gridRouter);
app.use('/selector', pickRouter);
app.use('/crystal', (req, res, next) => {
  if (req.path === '/') {
    // redirect to view instead of API
    res.redirect('/crystal/view/all');
  } else {
    next();
  }
}, crystalRouter);

// =======================================
//         404 Handler
// =======================================
app.use((req, res, next) => {
  console.warn('⚠️ 404 Not Found:', req.method, req.url);
  next(createError(404));
});

// =======================================
//         Global Error Handler
// =======================================
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
