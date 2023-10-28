import {Router} from 'express';
import authentication from '../middlewares/authentication';
import VisualNovelController from '../controllers/visualNovelController';
import Authentication from '../controllers/authController';
import {checkSchema} from 'express-validator';
import loginRequest from '../requests/loginRequest';
import UserController from '../controllers/userController';
import userBodyRequest from '../requests/userBodyRequest';
import visualNovelBodyRequest from '../requests/visualNovelBodyRequest';
import BirthdayController from '../controllers/birthdayController';
import birthdayRequest from '../requests/birthdayRequest';
import checkRole from '../middlewares/checkRole';

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

// Implement Role Access
routers.use(['/birthday', '/birthdays'], checkRole('superAdmin'));

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
routers.get('/birthdays', BirthdayController.all);
routers.get('/birthdays/today', BirthdayController.findForTodayBirthday);
routers.get('/birthday/:id', BirthdayController.findById);
routers.post(
  '/birthday/store',
  checkSchema(birthdayRequest),
  BirthdayController.store
);
routers.put(
  '/birthday/update',
  checkSchema(birthdayRequest),
  BirthdayController.update
);
routers.delete('/birthday/delete/:id', BirthdayController.delete);
