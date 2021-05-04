import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinTable, OneToMany, OneToOne } from "typeorm";
import { CoreEntity } from './../../core/entities/core.entity';
import { IsBoolean, IsString } from 'class-validator';
import { Restaurant } from './../../restaurants/entities/restaurant.entity';
import { Post } from './post.entity';

@InputType('BoardInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Board extends CoreEntity {
    @Column()
    @Field(is => String)
    @IsString()
    name: string;

    @Column({ default: false})
    @Field(is => Boolean)
    @IsBoolean()
    isAdmin: boolean; // 관리자 전용 게시판

    @Field(is => [Post], {nullable: true})
    @OneToMany(
        is => Post,
        post => post.board,
        { nullable: true, onDelete: 'SET NULL' }
    )
    posts?: Post[];

    @Field(is => Restaurant)
    @OneToOne(
        is => Restaurant,
        { nullable: true, onDelete: 'CASCADE' }
    )
    @JoinTable()
    restaurant?: Restaurant;
}
