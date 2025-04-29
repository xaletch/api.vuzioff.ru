import { SECRET_KEY } from "@/constants";
import User from "@/models/user/user-model";
import { CustomRequest } from "@/types";
import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';;

export const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.replace('Bearer', '').trim();

    if (!token) {
      throw new Error('Токен не передан');
    }

    jwt.verify(token, SECRET_KEY, async (err, dec) => {
      if (err) {
        return res.status(403).json({ status: 403, message: 'Недействительный токен' });
      }

      const userId = (dec as CustomRequest).userId;
      const user = User.findOne({ where: { id: userId } });

      if (!user) {
        throw new Error('Пользователь не найден');
      }

      (req as CustomRequest).userId = userId;

      next();
    })
  }
  catch (err) {
    res.status(401).json({ status: 401, message: 'Не авторизован' });
  }
}