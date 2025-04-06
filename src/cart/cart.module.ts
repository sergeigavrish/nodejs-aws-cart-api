import { Module } from '@nestjs/common';

import { OrderModule } from '../order/order.module';

import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from 'src/entities/cart.entity';
import { CartItemEntity } from 'src/entities/cart-item.entity';
import { CartDbService } from './services/cart-db.service';

@Module({
  imports: [
    OrderModule,
    TypeOrmModule.forFeature([CartEntity, CartItemEntity]),
  ],
  providers: [CartDbService],
  controllers: [CartController],
})
export class CartModule {}
