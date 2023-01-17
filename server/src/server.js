import express from 'express';
import { routes } from './routes';
import { initializeDbConnection } from './db';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';

import User from './models/user.model';
import createError from 'http-errors';

const app = express();

const PORT = process.env.PORT || 8080;

// MIDDLEWARE
app.use(cors());

// This allows us to access the body of POST/PUT
// requests in our route handlers (as req.body)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// SET UP SESSION
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// INITIALIZE PASSPORT
app.use(passport.initialize());
app.use(passport.session());

// initialize using passport strategy on our user model
passport.use(User.createStrategy());

//sending to client information's about our user
passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, {
      id: user.id,
      username: user.username,
    });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

// Add all the routes to our Express server
// exported from routes/index.js
routes.forEach((route) => {
  app[route.method](route.path, route.handler);
});

/** ERROR HANDLERS */
//404
app.use((req, res, next) => {
  next(createError(404, 'Error 404: Route is not defined..🤨'));
});

//MAIN ERROR HANDLER
app.use((error, req, res, next) => {
  if (error) {
    res.status(error.status || 500).send({
      error: {
        status: error.status || 500,
        message: error.message,
        stack: error.stack,
      },
    });
  }
  next();
});

// Connect to the database, then start the server.
// This prevents us from having to create a new DB
// connection for every request.
initializeDbConnection().then(() => {
  app.listen(PORT, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Server is listening on port http://localhost:${PORT}`);
    }
  });
});
