import express, { Application, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectPostgres from './db';

// routers
import { orderRouter } from './routes';

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

connectPostgres();

// WebSocket

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});

export default app;