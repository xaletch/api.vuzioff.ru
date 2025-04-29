import { Request, Response } from 'express';
import { OrderType } from './types';
import Orders from '@/models/orders/order-model';

class OrderController {
  async create(req: Request, res: Response) {
    try {
      const { name, telegram, roblox_username, description } = req.body;
    
      if (!name || !telegram || !roblox_username || !description) {
        return res.status(400).json({ status: 'error', message: 'Не все поля заполнены' });
      }

      const existingOrder = await Orders.findOne({ where: { telegram } });

      const isWorking = existingOrder?.dataValues.status === 'pending' ? true : existingOrder?.dataValues.status === 'processing' ? true : false;

      if (existingOrder && isWorking) {
        return res.status(400).json({ status: 400, message: 'Заказ с таким telegram уже существует. Ожидайте пока он будет обработан.' });
      }

      const newOrder: OrderType = {
        userId: 1,
        name,
        telegram,
        roblox_username,
        description,
        status: 'pending'
      }

      await Orders.create(newOrder);
      // io.emit('order-created', order);

      res.status(201).json({ status: 'success', message: 'Заказ успешно создан. Ожидайте пока он будет обработан.' });
    }
    catch (error) {
      res.status(500).json({ status: 'error', message: 'Ошибка сервера. Попробуйте позже' });
    }
  }

  async updateStatus(req: Request, res: Response) {
    try {
      const { orderId } = req.params;
      const { status } = req.body;

      const order = await Orders.findOne({ where: { id: orderId } });

      if (!order) {
        return res.status(404).json({ status: 'error', message: 'Заказ не найден' });
      }

      await order.update({ status });

      // io.emit('orderStatusChanged', { orderId, status });

      res.status(200).json({ status: 200, message: 'Статус заказа обновлен' });
    } catch (error) {
      res.status(500).json({ status: 500, message: 'Ошибка сервера' });
    }
  }

  async all(_: Request, res: Response) {
    try {
      const orders = await Orders.findAll();
      
      res.status(200).json({ status: 200, orders });
    }
    catch (error) {
      res.status(500).json({ status: 500, message: 'Ошибка сервера. Попробуйте позже' });
    }
  }
}

export default new OrderController();