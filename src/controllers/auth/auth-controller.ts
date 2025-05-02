import User from '@/models/user/user-model';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '@/constants';
import { IUser } from '@/models/user/types';

class AuthController {
  async login(req: Request, res: Response) {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ status: 400, message: 'Не все поля заполнены корректно' });
      return;
    }

    const user = await User.unscoped().findOne({ where: { username: username } });

    if (!user) {
      res.status(400).json({ status: 400, message: 'Неверный логин или пароль' });
      return;
    }

    const validate = await bcrypt.compare(password, user.dataValues.password);

    if (!validate) {
      res.status(400).json({ status: 400, message: 'Неверный логин или пароль' });
      return;
    }

    const token = jwt.sign({ access: user.dataValues.access, userId: user.dataValues.id, }, SECRET_KEY, { expiresIn: '1d' });

    res.status(200).json({ status: 200, token: token });
   try {
   }
   catch (error) {
    res.status(500).json({ status: 500, message: 'Ошибка сервера' });
   }
  };
  async register(req: Request, res: Response) {
    try {
      const { username, password, repeat_password } = req.body;

      if (!username || !password || !repeat_password) {
        return res.status(400).json({ status: 400, message: 'Не все поля заполнены корректно' });
      }

      if (password !== repeat_password) {
        return res.status(400).json({ status: 400, message: "Пароли не совпадают" });
      }

      const user = await User.findOne({ where: { username } });

      if (user) {
        res.status(400).json({ status: 400, message: 'Пользователь уже зарегистрирован' });
        return;
      }

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      const newUser: IUser = {
        username: username,
        password: hash,
        access: 0
      };

      const createdUser = await User.create(newUser);

      const token = jwt.sign({ access: createdUser.dataValues.access, userId: createdUser.dataValues.id }, SECRET_KEY, { expiresIn: '1d' });

      res.status(201).json({ status: 201, token: token });
    }
    catch (error) {
      res.status(500).json({ status: 500, message: 'Ошибка сервера' });
    }
  }
}
export default new AuthController();