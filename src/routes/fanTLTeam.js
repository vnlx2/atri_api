import Express from "express";
import { all, detail, drop, store, update } from "../controllers/fanTLTeamController.js";
import authMiddleware from "../middlewares/auth.js";
const router = Express.Router();

// Route List
router.use(authMiddleware);
router.get('/list', all);
router.get('/detail', detail);
router.post('/store', store);
router.put('/update', update);
router.delete('/delete', drop);

// Export router
export default router;