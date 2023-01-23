import { Router } from 'express';
import { authMiddleware } from '../util/utils.js';

export const home_route = Router();

home_route.get('/', authMiddleware, function (req, res, next) {
  try {
    res.status(200).json({ msg: 'User is authorized.', isAuthenticated: true });
  } catch (error) {
    next(error);
  }
});
