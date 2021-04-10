import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { IsArray, IsNumber } from "class-validator";
import { CoreDTO } from './../../core/dtos/core.dto';
import { OrderMenuOption } from './../entities/order-menu.entity';

@InputType()
class CreateOrderMenuInput {
    @Field(is => Int)
    @IsNumber()
    itemId: number;

    @Field(is => Int)
    @IsNumber()
    count: number; // 수량

    @Field(is => [OrderMenuOption], { nullable: true })
    @IsArray()
    options?: OrderMenuOption[];
}

@InputType()
export class CreateOrderInput {
    @Field(is => Int)
    @IsNumber()
    restaurantId: number;

    @Field(is => [CreateOrderMenuInput])
    @IsArray()
    items: CreateOrderMenuInput[];
}

@ObjectType()
export class CreateOrderOutput extends CoreDTO {}
