import { Router } from 'express';
import { authMiddleware } from '../util/utils.js';

export const protectedRoute = Router();

protectedRoute.get('/', authMiddleware, function (req, res, next) {
  try {
    res.status(200).json({ success: true, msg: 'User is authorized.'});
  } catch (error) {
    next(error);
  }
});
