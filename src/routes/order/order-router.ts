import orderController from "../../controllers/order/order-controller";
import { Router } from "express";

const router = Router();

router.post('/order', orderController.create);
router.get('/order', orderController.all);
router.patch('/order/:orderId/status', orderController.updateStatus);

export default router;