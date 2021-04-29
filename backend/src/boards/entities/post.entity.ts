import { CoreEntity } from './../../core/entities/core.entity';
import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, RelationId } from "typeorm";
import { IsArray, IsNumber, IsString } from 'class-validator';
import { User } from './../../users/entities/user.entity';
import { Comment } from './comment.entity';
import { Order } from './../../orders/entities/order.entity';
import { Board } from './board.entity';

@InputType('PostInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Post extends CoreEntity {
    // 해당 주문
    @Column()
    @Field(is => String)
    @IsString()
    title: string;

    @Column()
    @Field(is => String)
    @IsString()
    post: string;

    @Column('json', { nullable: true })
    @Field(is => [String], { nullable: true })
    @IsArray()
    files?: string[];

    @Field(is => Order, { nullable: true })
    @OneToOne(
        is => Order,
        { nullable: true, onDelete: 'CASCADE' }
    )
    @JoinTable()
    order?: Order; // 주문 건당 리뷰를 쓰는 경우

    @Column({ default: 0 })
    @Field(is => Int)
    @IsNumber()
    views: number;

    @Field(is => Board)
    @ManyToOne(
        is => Board,
        board => board.posts,
        { onDelete: 'CASCADE' }
    )
    board: Board;

    @RelationId((post: Post) => post.board)
    @IsNumber()
    boardId: number;

    @Field(is => User, { nullable: true })
    @ManyToOne(
        type => User,
        user => user.posts,
        { nullable: true, onDelete: 'SET NULL' }
    )
    user?: User;

    @RelationId((post: Post) => post.user)
    @IsNumber()
    userId: number;

    @Field(is => [User], { nullable: true })
    @ManyToMany(
        is => User,
        user => user.likePosts,
        { nullable: true, onDelete: 'SET NULL', eager: true }
    )
    @JoinTable()
    likes: User[];

    @Field(is => [Comment], { nullable: true })
    @OneToMany(
        is => Comment,
        comment => comment.post,
        { nullable: true, onDelete: 'SET NULL' }
    )
    comments?: Comment;
}
