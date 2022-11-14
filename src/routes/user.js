import Express from "express";
import { all, drop, show, store, update } from "../controllers/userController.js";
import adminMiddleware from "../middlewares/admin.js";
const router = Express.Router();

// Route List
router.use(adminMiddleware);
router.get('/all', all);
router.get('/show', show);
router.post('/store', store);
router.put('/update', update);
router.delete('/delete', drop);

// Export router
export default router;