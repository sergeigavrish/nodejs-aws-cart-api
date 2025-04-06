import { Injectable } from '@nestjs/common';
import { Cart, CartStatuses } from '../models';
import { PutCartPayload } from 'src/order/type';
import { Repository } from 'typeorm';
import { CartEntity } from 'src/entities/cart.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItemEntity } from 'src/entities/cart-item.entity';
import { ICartService } from './icart.service';

@Injectable()
export class CartDbService implements ICartService {
  constructor(
    @InjectRepository(CartEntity)
    private cartsRepository: Repository<CartEntity>,
    @InjectRepository(CartItemEntity)
    private cartItemsRepository: Repository<CartItemEntity>,
  ) {}

  async findByUserId(userId: string): Promise<Cart | null> {
    const cartEntity = await this.cartsRepository.findOne({
      where: { user_id: userId },
      relations: { cartItems: true },
    });
    if (!cartEntity) {
      return null;
    }
    return {
      id: cartEntity.id,
      user_id: cartEntity.user_id,
      created_at: cartEntity.created_at,
      updated_at: cartEntity.updated_at,
      status: cartEntity.status,
      items: cartEntity.cartItems.map((item) => ({
        product: {
          id: item.product_id,
          title: '',
          description: '',
          price: 100,
        },
        count: item.count,
      })),
    };
  }

  async createByUserId(userId: string): Promise<Cart> {
    const cartEntity = await this.cartsRepository.save({
      user_id: userId,
      status: CartStatuses.OPEN,
    });

    return {
      id: cartEntity.id,
      user_id: cartEntity.user_id,
      created_at: cartEntity.created_at,
      updated_at: cartEntity.updated_at,
      status: cartEntity.status,
      items: [],
    };
  }

  async findOrCreateByUserId(userId: string): Promise<Cart> {
    const userCart = await this.findByUserId(userId);

    if (userCart) {
      return userCart;
    }

    return this.createByUserId(userId);
  }

  async updateByUserId(userId: string, payload: PutCartPayload): Promise<Cart> {
    const userCart = await this.findOrCreateByUserId(userId);

    if (payload.count <= 0) {
      await this.cartItemsRepository.delete({
        cart_id: userCart.id,
        product_id: payload.product.id,
      });
    } else {
      await this.cartItemsRepository.save({
        cart_id: userCart.id,
        product_id: payload.product.id,
        count: payload.count,
      });
    }

    return await this.findOrCreateByUserId(userId);
  }

  async removeByUserId(userId: string): Promise<void> {
    await this.cartsRepository.delete({ user_id: userId });
  }
}
