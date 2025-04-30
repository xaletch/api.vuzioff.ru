import { IOrders } from '@/models/orders/types';
import WebSocket from 'ws';

const orders: Set<WebSocket> = new Set();

export function initWS() {
  const wss = new WebSocket.Server({ port: 8020 });

  wss.on('connection', ws => {
    orders.add(ws);
    console.log('new connection');

    ws.on('close', () => {
      orders.delete(ws);
      console.log('close connection');
    });

    ws.on('message', data => {
      console.log('new order', data);
    });
  });

  return wss;
}

export const sendOrder = (mes: string, data: IOrders) => {
  orders.forEach(order => {
    if (order.readyState === WebSocket.OPEN) {
      order.send(JSON.stringify({ message: mes, data: data }));
    }
  })
};