import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Restaurant } from './../restaurants/entities/restaurant.entity';
import { Item } from './../restaurants/entities/item.entity';
import { Option } from './../restaurants/entities/option.entity';
import { OrderMenu } from './entities/order-menu.entity';
import { OrdersResolver } from './orders.resolver';
import { OrdersService } from './orders.service';

@Module({
    imports: [TypeOrmModule.forFeature([
        Order,
        Restaurant,
        Item,
        Option,
        OrderMenu,
    ])],
    providers: [OrdersResolver, OrdersService],
})
export class OrdersModule {}
