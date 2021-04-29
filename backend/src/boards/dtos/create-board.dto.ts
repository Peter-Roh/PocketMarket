import { Field, InputType, Int, ObjectType, PartialType, PickType } from "@nestjs/graphql";
import { Board } from "../entities/board.entity";
import { Post } from "../entities/post.entity";
import { Comment } from "../entities/comment.entity";
import { CoreDTO } from './../../core/dtos/core.dto';
import { IsNumber } from "class-validator";

@InputType()
export class CreateBoardInput extends PickType(Board, [
    "name",
]) {
    @Field(is => Int)
    @IsNumber()
    restaurantId: number;
}

@ObjectType()
export class CreateBoardOutput extends CoreDTO {}

@InputType()
export class CreateReviewInput extends PartialType(
    PickType(
        Post, [
            "title",
            "post",
            "files",
        ]
    )
) {
    @Field(is => Int)
    @IsNumber()
    boardId: number;

    @Field(is => Int)
    @IsNumber()
    orderId?: number;
}

@InputType()
export class CreatePostInput extends PartialType(
    PickType(
        Post, [
            "title",
            "post",
            "files",
        ]
    )
) {
    @Field(is => Int)
    @IsNumber()
    boardId: number;
}

@ObjectType()
export class CreatePostOutput extends CoreDTO {}

@InputType()
export class CreateCommentInput extends PickType(Comment, [
    "comment",
]) {
    @Field(is => Int)
    @IsNumber()
    postId: number;
}

@ObjectType()
export class CreateCommentOutput extends CoreDTO {}
