import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { User } from './../entities/user.entity';
import { CoreDTO } from './../../core/dtos/core.dto';

@InputType()
export class CreateAccountInput extends PickType(User, ["email", "password", "role"]) {}

@ObjectType()
export class CreateAccountOutput extends CoreDTO {}
