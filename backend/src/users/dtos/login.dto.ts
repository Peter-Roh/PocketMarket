import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreDTO } from './../../core/dtos/core.dto';
import { User } from './../entities/user.entity';

@InputType()
export class LoginInput extends PickType(User, ["email", "password"]) {}

@ObjectType()
export class LoginOutput extends CoreDTO {
    @Field(is => String, { nullable: true })
    token?: string;
}
