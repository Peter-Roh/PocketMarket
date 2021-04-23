import { InputType, ObjectType, PickType } from "@nestjs/graphql";
import { Board } from "../entities/board.entity";
import { Post } from "../entities/post.entity";
import { Comment } from "../entities/comment.entity";
import { CoreDTO } from './../../core/dtos/core.dto';

@InputType()
export class CreateBoardInput extends PickType(Board, [
    "name",
]) {}

@ObjectType()
export class CreateBoardOutput extends CoreDTO {}

@InputType()
export class CreatePostInput extends PickType(Post, [
    "title",
    "post",
    "files",
]) {}

@ObjectType()
export class CreatePostOutput extends CoreDTO {}

@InputType()
export class CreateCommentInput extends PickType(Comment, [
    "comment",
]) {}

@ObjectType()
export class CreateCommentOutput extends CoreDTO {}
