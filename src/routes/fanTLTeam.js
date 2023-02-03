import Express from "express";
import { all, detail, drop, store, update } from "../controllers/fanTLTeamController.js";
import checkRolesMiddleware from "../middlewares/checkRoles.js";
const router = Express.Router();

// Route List
router.use(checkRolesMiddleware(['admin', 'superAdmin']));
router.get('/list', all);
router.get('/detail', detail);
router.post('/store', store);
router.put('/update', update);
router.delete('/delete', drop);

// Export router
export default router;