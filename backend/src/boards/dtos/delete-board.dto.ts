import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsNumber } from "class-validator";
import { CoreDTO } from './../../core/dtos/core.dto';

@InputType()
export class DeleteBoardInput {
    @Field(is => Number)
    @IsNumber()
    boardId: number;
}

@ObjectType()
export class DeleteBoardOutput extends CoreDTO {}

@InputType()
export class DeletePostInput {
    @Field(is => Number)
    @IsNumber()
    postId: number;
}

@ObjectType()
export class DeletePostOutput extends CoreDTO {}

@InputType()
export class DeleteCommentInput {
    @Field(is => Number)
    @IsNumber()
    commentId: number;
}

@ObjectType()
export class DeleteCommentOutput extends CoreDTO {}
