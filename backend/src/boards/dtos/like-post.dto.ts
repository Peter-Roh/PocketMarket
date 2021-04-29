import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsNumber } from 'class-validator';
import { CoreDTO } from './../../core/dtos/core.dto';

@InputType()
export class LikePostInput {
    @Field(is => Number)
    @IsNumber()
    postId: number;
}

@ObjectType()
export class LikePostOutput extends CoreDTO {}
