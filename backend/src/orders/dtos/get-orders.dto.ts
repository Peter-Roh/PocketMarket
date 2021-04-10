import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { Order } from './../entities/order.entity';
import { CoreDTO } from './../../core/dtos/core.dto';

@ObjectType()
export class GetOrdersOutput extends CoreDTO {
    @Field(is => [Order], { nullable: true })
    orders?: Order[]
}
