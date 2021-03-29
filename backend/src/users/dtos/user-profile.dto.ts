import { ArgsType, Field, Int, ObjectType } from "@nestjs/graphql";
import { IsNumber } from "class-validator";
import { CoreDTO } from './../../core/dtos/core.dto';
import { User } from './../entities/user.entity';

@ArgsType()
export class UserProfileInput {
    @Field(is => Number)
    @IsNumber()
    userId: number;
}

@ObjectType()
export class UserProfileOutput extends CoreDTO {
    @Field(is => User, { nullable: true })
    user?: User;
}
