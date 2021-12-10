var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Import mongoose
const mongoose = require('mongoose');
// Import global config
const config = require('./config/globals');
// Import passport
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
// Import Swagger UI
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');

// Routers
var indexRouter = require('./routes/index');
var scheduleRouter = require('./routes/api/schedule');

var app = express();

// Load Swagger API documentation from YAML file
const swaggerDocumentation = YAML.load('./documentation/api-spec.yaml');
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocumentation));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Initialize passport
app.use(passport.initialize());

// BasicStrategy authentication
passport.use(new BasicStrategy((username, password, done) => {
  if (username == 'root' && password == 'secret') {
    console.log(`Authentication successful for user: ${username}`);
    return done(null, username);
  }
  else {
    console.log(`Authentication failed for user: ${username}`);
    return done(null, false);
  }
}));

// Endpoints
app.use('/', indexRouter);

// API endpoints
app.use('/api/schedule', passport.authenticate('basic', { session: false }), scheduleRouter); // Secured with passport auth

// Connect to db
mongoose.connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true })
.then((message) => {
  console.log('Connected to db successfully!');
})
.catch((err) => {
  console.log(`Connection failed! ERR: ${err}`);
});

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
