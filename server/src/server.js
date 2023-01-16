import express from 'express';
import { routes } from './routes';
import { initializeDbConnection } from './db';
import createError from 'http-errors';

const app = express();

const PORT = process.env.PORT || 8080;

// MIDDLEWARE
// This allows us to access the body of POST/PUT
// requests in our route handlers (as req.body)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
