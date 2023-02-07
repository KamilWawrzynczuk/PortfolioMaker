import { Router } from 'express';
import { loginUser } from './usersControllers/loginUser.js';
import { registerUser } from './usersControllers/registerUser.js';
import { logoutUser } from './usersControllers/logoutUser.js';
import { verifyUserEmail } from './usersControllers/verifyUserEmail.js';
import { userValidationMiddleware } from '../models/validation/userModelValidation.js';
import { resetPasswordValidationMiddleware } from '../models/validation/resetPasswordValidation.js';
import { forgotPasswordSendEmail } from './usersControllers/forgotPasswordSendEmail.js';
import { resetUserPassword } from './usersControllers/resetUserPassword.js';
import { getOneUser } from './usersControllers/getOneUser.js';
import { authMiddleware } from '../util/utils.js';
import { addIntroData } from './usersControllers/addIntroData.js';
import { getUserData } from './usersControllers/getUserData.js';
import { getUserProjectsData } from './usersControllers/getUserProjectsData.js';
import { addProjectData } from './usersControllers/addProjectData.js';

export const usersRoute = Router();

// GET one user
usersRoute.get('/getOne/:user_id', authMiddleware, getOneUser);

// POST LOGIN
usersRoute.post('/login', loginUser);

// POST REGISTER
usersRoute.post('/register', userValidationMiddleware, registerUser);

// GET LOGOUT
usersRoute.get('/logout', logoutUser);

// PUT verify-email
usersRoute.put('/verify-email', verifyUserEmail);

//PUT Forgot password
usersRoute.post('/forgot-password/', forgotPasswordSendEmail);

// PUT Reset user password
usersRoute.patch(
  '/reset-password/',
  resetPasswordValidationMiddleware,
  resetUserPassword
);

// PATCH put user data intro database
usersRoute.patch('/addIntroData', addIntroData);

// PATCH user projects data
usersRoute.patch('/addProjectData', addProjectData);

// GET user data from database
usersRoute.post('/getUserData', getUserData);

// GET user projects from database
usersRoute.post('/getUserProjects', getUserProjectsData);
