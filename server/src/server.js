import express from 'express';
import { initializeDbConnection } from './db.js';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import createError from 'http-errors';
import routes from './routes/index.js';

const app = express();

const PORT = process.env.PORT || 8080;

// MIDDLEWARE
app.use(
  cors({
    origin: 'http://localhost:5173', // where react app is working
  })
);

// app.use(
//   '/',
//   createProxyMiddleware({ target: 'http://localhost:5173', changeOrigin: true })
// );

// This allows us to access the body of POST/PUT
// requests in our route handlers (as req.body)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SECRET));

//SET UP SESSION
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
app.use(express.json({
  limit: '50mb'
}));

import('./config/passportConfig.js');

// Add all the routes to our Express server
app.use(routes);

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
