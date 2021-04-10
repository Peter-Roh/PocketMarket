import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Order } from '../entities/order.entity';
import { CoreDTO } from './../../core/dtos/core.dto';

@InputType()
export class EditOrderInput extends PickType(Order, ['id']) {}

@ObjectType()
export class EditOrderOutput extends CoreDTO {}
