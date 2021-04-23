import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne, RelationId } from "typeorm";
import { CoreEntity } from './../../core/entities/core.entity';
import { User } from './../../users/entities/user.entity';
import { IsNumber, IsString } from 'class-validator';
import { Post } from "./post.entity";

@InputType('CommentInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Comment extends CoreEntity {
    @Column()
    @Field(is => String)
    @IsString()
    comment: string;

    @Field(is => User, { nullable: true })
    @ManyToOne(
        type => User,
        user => user.comments,
        { nullable: true, onDelete: 'SET NULL' }
    )
    user?: User;

    @RelationId((comment: Comment) => comment.user)
    @IsNumber()
    userId: number;

    @Field(is => Post)
    @ManyToOne(
        type => Post,
        post => post.comments,
        { onDelete: 'CASCADE' }
    )
    post: Post;

    @RelationId((comment: Comment) => comment.post)
    @IsNumber()
    postId: number;
}
