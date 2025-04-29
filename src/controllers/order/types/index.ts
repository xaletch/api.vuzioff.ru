export interface OrderType {
  userId: number;
  name: string;
  telegram: string;
  roblox_username: string;
  description: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
}