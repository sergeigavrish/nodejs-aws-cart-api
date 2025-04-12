import { PutCartPayload } from 'src/order/type';
import { Cart } from '../models';

export interface ICartService {
  findByUserId(userId: string): Promise<Cart | null>;
  createByUserId(userId: string): Promise<Cart>;
  findOrCreateByUserId(userId: string): Promise<Cart>;
  updateByUserId(userId: string, payload: PutCartPayload): Promise<Cart>;
  removeByUserId(userId: string): Promise<void>;
}
