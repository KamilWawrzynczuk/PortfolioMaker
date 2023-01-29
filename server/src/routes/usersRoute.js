import { Router } from 'express';;
import { loginUser } from './usersControllers/loginUser.js';
import { registerUser } from './usersControllers/registerUser.js';
import { logoutUser } from './usersControllers/logoutUser.js';
import { verifyUserEmail } from './usersControllers/verifyUserEmail.js';
import { userValidationMiddleware } from '../models/validation/userModelValidation.js';

export const usersRoute = Router();

// POST LOGIN
usersRoute.post('/login', loginUser);

// POST REGISTER
usersRoute.post('/register', userValidationMiddleware , registerUser);

// GET LOGOUT
usersRoute.get('/logout', logoutUser);

// PUT verify-email
usersRoute.put('/verify-email', verifyUserEmail);
