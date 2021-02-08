import { User } from './../entities/user.entity';
import { Field, ObjectType, InputType, PickType } from '@nestjs/graphql';
import { CoreDTO } from './../../core/dtos/core.dto';

@InputType()
export class LoginInput extends PickType(User, ["email", "password"]) {}

@ObjectType()
export class LoginOutput extends CoreDTO {
    @Field(is => String, { nullable: true })
    token?: string;
}
