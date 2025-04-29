import authController from "@/controllers/auth/auth-controller";
import { auth } from "@/middlewares/isAuth";
import { Router } from "express";

const router = Router();

router.post('/login', authController.login);
router.post('/register', authController.register);

export default router;