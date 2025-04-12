import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { Cart, CartStatuses } from '../models';
import { PutCartPayload } from 'src/order/type';
import { ICartService } from './icart.service';

@Injectable()
export class CartService implements ICartService {
  private userCarts: Record<string, Cart> = {};

  async findByUserId(userId: string): Promise<Cart | null> {
    return this.userCarts[userId] || null;
  }

  async createByUserId(user_id: string): Promise<Cart> {
    const timestamp = Date.now();

    const userCart = {
      id: randomUUID(),
      user_id,
      created_at: timestamp,
      updated_at: timestamp,
      status: CartStatuses.OPEN,
      items: [],
    };

    this.userCarts[user_id] = userCart;

    return userCart;
  }

  async findOrCreateByUserId(userId: string): Promise<Cart> {
    const userCart = this.findByUserId(userId);

    if (userCart) {
      return userCart;
    }

    return this.createByUserId(userId);
  }

  async updateByUserId(userId: string, payload: PutCartPayload): Promise<Cart> {
    const userCart = await this.findOrCreateByUserId(userId);

    const index = userCart.items.findIndex(
      ({ product }) => product.id === payload.product.id,
    );

    if (index === -1) {
      userCart.items.push(payload);
    } else if (payload.count === 0) {
      userCart.items.splice(index, 1);
    } else {
      userCart.items[index] = payload;
    }

    return userCart;
  }

  async removeByUserId(userId): Promise<void> {
    this.userCarts[userId] = null;
  }
}
