import {Router} from 'express';
import authentication from '../middlewares/authentication';
import VisualNovelController from '../controllers/visualNovelController';
import Authentication from '../controllers/authController';
import {checkSchema} from 'express-validator';
import loginRequest from '../requests/loginRequest';

export const routers = Router();

/**
 * Authentication Routes
 */
routers.use('/logout', authentication());
routers.post('/login', checkSchema(loginRequest), Authentication.login);
routers.post('/logout', () => {});

/**
 * User Routes
 */
routers.use(['/users', '/user'], [authentication()]);
routers.get('/users', (req, res) => {
  res.send('ok');
});
routers.get('/user/:id', (req, res) => {
  res.send('ok2');
});
routers.post('/user/store', () => {});
routers.put('/user/update', () => {});
routers.delete('/user/delete/:id', () => {});

/**
 * Visual Novel Routes
 */
// routers.use(['/visualnovels', '/visualnovel'], [authentication()]);
routers.get('/visualnovels', VisualNovelController.list);
routers.get('/visualnovel/:id', () => {});
routers.post('/visualnovel/store', () => {});
routers.put('/visualnovel/update', () => {});
routers.delete('/visualnovel/delete/:id', () => {});

/**
 * Birthday Routes
 */
routers.use(['/birthdays', '/birthdays'], [authentication()]);
routers.get('/birthdays', () => {});
routers.get('/birthday/:id', () => {});
routers.post('/birthday/store', () => {});
routers.put('/birthday/update', () => {});
routers.delete('/birthday/delete/:id', () => {});
