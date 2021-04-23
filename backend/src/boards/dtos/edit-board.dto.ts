import { Field, InputType, Int, ObjectType, PartialType, PickType } from "@nestjs/graphql";
import { CoreDTO } from './../../core/dtos/core.dto';
import { Board } from "../entities/board.entity";
import { IsNumber } from "class-validator";
import { Post } from "../entities/post.entity";
import { Comment } from "../entities/comment.entity";

@InputType()
export class EditBoardInput extends PartialType(
    PickType(
        Board, [
            "name",
        ]
    )
) {
    @Field(is => Int)
    @IsNumber()
    boardId: number;
}

@ObjectType()
export class EditBoardOutput extends CoreDTO {}

@InputType()
export class EditPostInput extends PartialType(
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
    postId: number;
}

@ObjectType()
export class EditPostOutput extends CoreDTO {}

@InputType()
export class EditCommentInput extends PartialType(
    PickType(
        Comment, [
            "comment",
        ]
    )
) {
    @Field(is => Int)
    @IsNumber()
    commentId: number;
}

@ObjectType()
export class EditCommentOutput extends CoreDTO {}
