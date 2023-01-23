import { Router } from 'express';
import { users_route } from './Users/users_route.js';
import { home_route } from './home_route.js';

const routes = Router();

routes.use('/', home_route);
routes.use('/users', users_route);

export default routes;
