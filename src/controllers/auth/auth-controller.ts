import { Request, Response } from 'express';

class AuthController {
  async login(req: Request, res: Response) {
   try {
   }
   catch (error) {
    res.status(500).json({ status: 500, message: 'Ошибка сервера' });
   }
  };
  async register(req: Request, res: Response) {
    try {
    }
    catch (error) {
      res.status(500).json({ status: 500, message: 'Ошибка сервера' });
    }
  }
}
export default new AuthController();