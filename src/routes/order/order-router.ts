import { auth } from "@/middlewares/isAuth";
import orderController from "../../controllers/order/order-controller";
import { Router } from "express";

const router = Router();

router.post('/order', orderController.create);
router.get('/order', auth, orderController.all);
router.patch('/order/:orderId/status', auth, orderController.updateStatus);

export default router;