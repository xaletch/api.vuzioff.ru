export interface IOrders {
  id?: number;
  userId?: number;
  name: string;
  telegram: string;
  roblox_username: string;
  description: string;
  status?: 'pending' | 'processing' | 'completed' | 'failed';
}  