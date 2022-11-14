import Express from "express";
import { login } from "../controllers/authController.js";
const router = Express.Router();

// Route List
router.post('/login', login);

// Export router
export default router;