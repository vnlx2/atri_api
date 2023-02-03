import Express from "express";
import { all, drop, show, store, update } from "../controllers/userController.js";
import checkRolesMiddleware from "../middlewares/checkRoles.js";
const router = Express.Router();

// Route List
router.use(checkRolesMiddleware(['admin', 'superAdmin']));
router.get('/all', all);
router.get('/show', show);
router.post('/store', store);
router.put('/update', update);
router.delete('/delete', drop);

// Export router
export default router;