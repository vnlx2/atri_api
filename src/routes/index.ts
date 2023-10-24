import {Router} from 'express';
import authentication from '../middlewares/authentication';
import VisualNovelController from '../controllers/visualNovelController';
import Authentication from '../controllers/authController';
import {checkSchema} from 'express-validator';
import loginRequest from '../requests/loginRequest';
import UserController from '../controllers/userController';
import userBodyRequest from '../requests/userBodyRequest';
import visualNovelBodyRequest from '../requests/visualNovelBodyRequest';

export const routers = Router();

// Implement Authentication Middleware
routers.use(
  [
    '/logout',
    '/users',
    '/user',
    '/visualnovels',
    '/visualnovel',
    '/birthday',
    '/birthdays',
  ],
  authentication()
);

/**
 * Authentication Routes
 */
routers.post('/login', checkSchema(loginRequest), Authentication.login);
routers.post('/logout', Authentication.logout);

/**
 * User Routes
 */
routers.get('/users', UserController.all);
routers.get('/user/:id', UserController.detail);
routers.post('/user/store', checkSchema(userBodyRequest), UserController.store);
routers.put(
  '/user/update',
  checkSchema(userBodyRequest),
  UserController.update
);
routers.delete('/user/delete/:id', UserController.drop);

/**
 * Visual Novel Routes
 */
routers.get('/visualnovels', VisualNovelController.list);
routers.get('/visualnovel/:id', VisualNovelController.detail);
routers.post(
  '/visualnovel/store',
  checkSchema(visualNovelBodyRequest),
  VisualNovelController.store
);
routers.put(
  '/visualnovel/update',
  checkSchema(visualNovelBodyRequest),
  VisualNovelController.update
);
routers.delete('/visualnovel/delete/:id', VisualNovelController.delete);

/**
 * Birthday Routes
 */
routers.use(['/birthdays', '/birthdays'], [authentication()]);
routers.get('/birthdays', () => {});
routers.get('/birthday/:id', () => {});
routers.post('/birthday/store', () => {});
routers.put('/birthday/update', () => {});
routers.delete('/birthday/delete/:id', () => {});
