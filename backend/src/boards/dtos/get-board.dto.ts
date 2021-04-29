import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsNumber } from "class-validator";
import { Board } from "../entities/board.entity";
import { Post } from "../entities/post.entity";
import { Comment } from "../entities/comment.entity";
import { CoreDTO } from './../../core/dtos/core.dto';

@ObjectType()
export class GetBoardsOutput extends CoreDTO {
    @Field(is => [Board], { nullable: true })
    boards?: Board[];
}

@InputType()
export class GetPostsInput {
    @Field(is => Number)
    @IsNumber()
    boardId: number;
}

@ObjectType()
export class GetPostsOutput extends CoreDTO {
    @Field(is => [Post], { nullable: true })
    posts?: Post[];
}

@InputType()
export class GetCommentsInput {
    @Field(is => Number)
    @IsNumber()
    postId: number;
}

@ObjectType()
export class GetCommentsOutput extends CoreDTO {
    @Field(is => [Comment], { nullable: true })
    comments?: Comment[];
}

@InputType()
export class GetBoardInput {
    @Field(is => Number)
    @IsNumber()
    boardId: number;
}

@ObjectType()
export class GetBoardOutput extends CoreDTO {
    @Field(is => Board, { nullable: true })
    board?: Board;
}

@InputType()
export class GetPostInput {
    @Field(is => Number)
    @IsNumber()
    postId: number;
}

@ObjectType()
export class GetPostOutput extends CoreDTO {
    @Field(is => Post, { nullable: true })
    post?: Post;
}
