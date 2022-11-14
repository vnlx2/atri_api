import Express from "express";
import { detail, drop, list, store, update } from "../controllers/visualNovelController.js";
import authMiddleware from "../middlewares/auth.js";
const router = Express.Router();

// Route List
router.use(authMiddleware);
router.get('/list', list);
router.get('/detail', detail);
router.post('/store', store);
router.put('/update', update);
router.delete('/delete', drop);

// Export router
export default router;