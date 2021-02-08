import { ArgsType, Field, ObjectType } from "@nestjs/graphql";
import { CoreDTO } from './../../core/dtos/core.dto';
import { User } from './../entities/user.entity';

@ArgsType()
export class UserProfileInput {
    @Field(is => Number)
    userId: number;
}

@ObjectType()
export class UserProfileOutput extends CoreDTO {
    @Field(is => User, { nullable: true })
    user?: User;
}
