import { auth } from "@/middlewares/isAuth";
import orderController from "../../controllers/order/order-controller";
import { Router } from "express";

const router = Router();

router.post('/orders', orderController.create);
router.get('/orders', auth, orderController.all);
router.patch('/orders/:orderId/status', auth, orderController.updateStatus);

export default router;