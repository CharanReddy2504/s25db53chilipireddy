// Import necessary modules
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
require('dotenv').config();

// Import createError from http-errors
var createError = require('http-errors');

// Import route handlers
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var resourceRouter = require('./routes/resource');  // Add resource route for your API
var gridRouter = require('./routes/grid');
var pickRouter = require('./routes/pick');

// Import controller for crystals
var crystal_controller = require('./controllers/crystal');  // Import the controller

// Initialize the Express app
var app = express();

// MongoDB connection
const connectionString = process.env.MONGO_CON;
mongoose.connect(connectionString)
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Set up view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Define routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/resource', resourceRouter);  // Ensure this route is correctly registered

app.use('/grid', gridRouter);
app.use('/selector', pickRouter);

// Error handling for 404
app.use(function(req, res, next) {
  next(createError(404, 'Not Found'));  // Create and pass the 404 error to the error handler
});

// Error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// Export the app for use in other files (e.g., in a server setup file)
module.exports = app;

