import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Order } from './entities/order.entity';
import { OrdersService } from './orders.service';
import { CreateOrderInput, CreateOrderOutput } from './dtos/create-order.dto';
import { GetOrdersOutput } from './dtos/get-orders.dto';
import { GetOrderInput, GetOrderOutput } from './dtos/get-order.dto';
import { EditOrderInput, EditOrderOutput } from './dtos/edit-order.dto';
import { AuthUser } from "src/auth/auth-user.decorator";
import { User } from './../users/entities/user.entity';
import { Role } from "src/auth/role.decorator";

@Resolver(of => Order)
export class OrdersResolver {
    constructor(private readonly ordersService: OrdersService) {}

    @Mutation(returns => CreateOrderOutput)
    @Role(['Any'])
    createOrder(
        @AuthUser() customer: User,
        @Args('input') createOrderInput: CreateOrderInput,
    ): Promise<CreateOrderOutput> {
        return this.ordersService.createOrder(customer, createOrderInput);
    }

    // 조회

    @Query(returns => GetOrdersOutput)
    @Role(['Any'])
    getOrders(
        @AuthUser() user: User,
    ): Promise<GetOrdersOutput> {
        return this.ordersService.getOrders(user);
    }

    @Query(returns => GetOrderOutput)
    @Role(['Any'])
    getOrder(
        @AuthUser() user: User,
        @Args('input') getOrderInput: GetOrderInput,
    ): Promise<GetOrderOutput> {
        return this.ordersService.getOrder(user, getOrderInput);
    }

    // 주문 상태 변경
    @Mutation(returns => EditOrderOutput)
    @Role(['Any'])
    editOrderStatus(
        @AuthUser() user: User,
        @Args('input') editOrderInput: EditOrderInput,
    ): Promise<EditOrderOutput> {
        return this.ordersService.editOrderStatus(user, editOrderInput);
    }
}
