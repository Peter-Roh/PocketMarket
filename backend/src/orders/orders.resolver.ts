import { Args, Mutation, Query, Resolver, Subscription } from "@nestjs/graphql";
import { Order } from './entities/order.entity';
import { OrdersService } from './orders.service';
import { Inject } from "@nestjs/common";
import { PubSub } from "graphql-subscriptions";
import { NEW_COOKED_ORDER, NEW_PENDING_ORDER, PUB_SUB, NEW_ORDER_UPDATE } from './../core/core.constants';
import { CreateOrderInput, CreateOrderOutput } from './dtos/create-order.dto';
import { GetOrdersOutput } from './dtos/get-orders.dto';
import { GetOrderInput, GetOrderOutput } from './dtos/get-order.dto';
import { EditOrderInput, EditOrderOutput } from './dtos/edit-order.dto';
import { OrderUpdatesInput } from './dtos/update-order.dto';
import { AuthUser } from "src/auth/auth-user.decorator";
import { User } from './../users/entities/user.entity';
import { Role } from "src/auth/role.decorator";

@Resolver(of => Order)
export class OrdersResolver {
    constructor(
        private readonly ordersService: OrdersService,
        @Inject(PUB_SUB) private readonly pubSub: PubSub,
    ) {}

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

    // 들어오는 주문 기다리기
    @Subscription(returns => Order, {
        filter: ({ pendingOrders: { ownerId } }, _, { user }) => {
            return ownerId === user.id; // 식당 주인만 주문을 볼 수 있음
        },
        resolve: ({pendingOrders: { order }}) => order,
    })
    @Role(['Owner'])
    pendingOrders() {
        return this.pubSub.asyncIterator(NEW_PENDING_ORDER);
    }

    // 조리 완료된 주문 알림
    @Subscription(returns => Order)
    @Role(["Any"])
    cookedOrders() {
        return this.pubSub.asyncIterator(NEW_COOKED_ORDER);
    }

    // 주문 상태 변경 체크
    @Subscription(returns => Order, {
        filter: (
            { orderUpdates: order }: { orderUpdates: Order },
            { input }: { input: OrderUpdatesInput },
            { user }: {user: User},
            ) => {
                if(order.customerId !== user.id && order.restaurant.ownerId !== user.id) {
                    return false; // 고객이거나 식당 주인일 경우에만
                }
                return order.id === input.id; // 해당하는 주문 확인 가능
            }
        }
    )
    @Role(["Any"])
    orderUpdates(@Args('input') orderUpdatesInput: OrderUpdatesInput) {
        return this.pubSub.asyncIterator(NEW_ORDER_UPDATE);
    }
}
