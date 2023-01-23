import { Router } from 'express';

export const home_route = Router();

home_route.get('/', function (req, res, next) {
  try {
    if (req.isAuthenticated()) {
      res
        .status(200)
        .json({ msg: 'User is authorized.', isAuthenticated: true });
    } else {
      res
        .status(401)
        .json({ msg: 'User is not authorized.', isAuthenticated: false });
    }
  } catch (error) {
    next(error);
  }
});
