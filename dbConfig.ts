import { CartItemEntity } from 'src/entities/cart-item.entity';
import { CartEntity } from 'src/entities/cart.entity';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const pgConfig = ({
  host,
  port,
  username,
  password,
  database,
}: {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}): PostgresConnectionOptions => ({
  host,
  port,
  username,
  password,
  database,
  type: 'postgres',
  entities: [CartEntity, CartItemEntity],
  synchronize: false,
  ssl: {
    rejectUnauthorized: false,
  },
});
