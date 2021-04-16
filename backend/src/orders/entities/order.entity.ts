import { Field, InputType, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, RelationId } from 'typeorm';
import { IsEnum, IsNumber } from 'class-validator';
import { CoreEntity } from './../../core/entities/core.entity';
import { Restaurant } from './../../restaurants/entities/restaurant.entity';
import { User } from './../../users/entities/user.entity';
import { OrderMenu } from './order-menu.entity';

export enum OrderStatus {
    Pending = "Pending", // 수락 대기중
    Cooking = "Cooking", // 조리중
    Cooked = "Cooked", // 조리 완료
    PickedUp = "PickedUp", // 픽업 완료
    Reviewed = "Reviewed", // 리뷰 작성 완료
    Aborted = "Aborted", // 주문 취소
}

registerEnumType(OrderStatus, { name: 'OrderStatus' });

@InputType('OrderInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Order extends CoreEntity {
    @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.Pending })
    @Field(is => OrderStatus)
    @IsEnum(OrderStatus)
    status: OrderStatus;

    @Field(is => Restaurant)
    @ManyToOne(
        is => Restaurant,
        restaurant => restaurant.orders,
        { nullable: true, onDelete: 'SET NULL', eager: true }
    )
    restaurant?: Restaurant;

    @Field(is => User)
    @ManyToOne(
        is => User,
        user => user.orders,
        { nullable: true, onDelete: 'SET NULL', eager: true }
    )
    customer?: User;

    @RelationId((order: Order) => order.customer)
    customerId: number;

    @Column()
    @Field(is => Int)
    @IsNumber()
    total: number; // 최종 가격

    @Field(is => [OrderMenu])
    @ManyToMany(is => OrderMenu, { eager: true })
    @JoinTable()
    items: OrderMenu[];
}
