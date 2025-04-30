import express, { Application, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// db
import connectDB from './db';

// routers
import { authRouter, orderRouter } from './routes';
import { initWS } from './websocket/connection';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT! || 8080;

app.use(cors());
app.use(express.json());

app.get('/', (_, res: Response) => {
  res.status(200).json({ message: "Welcome my friend 👋" });
});

// Обработка маршрутов
//

// routers
const API_PREFIX = '/api/v1';

// api
app.use(API_PREFIX, orderRouter);
app.use(API_PREFIX, authRouter);

// connect db
connectDB();

// WebSocket
initWS();

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});

export default app;