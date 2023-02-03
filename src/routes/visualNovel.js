import Express from "express";
import { detail, drop, getTitle, list, store, update } from "../controllers/visualNovelController.js";
import checkRolesMiddleware from "../middlewares/checkRoles.js";
const router = Express.Router();

// Route List
router.use(checkRolesMiddleware(['admin', 'superAdmin']));
router.get('/list', list);
router.get('/detail', detail);
router.get('/title', getTitle);
router.post('/store', store);
router.put('/update', update);
router.delete('/delete', drop);

// Export router
export default router;