import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { CoreEntity } from './../../core/entities/core.entity';
import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { User } from './../../users/entities/user.entity';
import { Touchgroup } from './touchgroup.entity';
import { Option } from './option.entity';

@InputType("ItemInputType", { isAbstract: true })
@ObjectType()
@Entity()
export class Item extends CoreEntity {
    @Field(is => String)
    @Column()
    @IsString()
    name: string;

    @Field(is => String, { nullable: true })
    @Column({ nullable: true })
    @IsString()
    itemImg?: string;

    @Field(is => Int)
    @Column()
    @IsNumber()
    price: number;

    @Field(is => Boolean)
    @Column({ default: false })
    @IsBoolean()
    isSoldOut: boolean;

    @Field(is => Touchgroup)
    @ManyToOne(
        type => Touchgroup,
        touchgroup => touchgroup.items,
        { onDelete: 'CASCADE' }
    )
    touchgroup: Touchgroup;

    @Field(is => User)
    @ManyToOne(
        type => User,
        user => user.items,
        { onDelete: 'CASCADE' }
    )
    owner: User;

    @RelationId((item: Item) => item.owner)
    @IsNumber()
    ownerId: number;

    @Field(is => [Option], { nullable: true })
    @OneToMany(
        type => Option,
        option => option.item,
        { nullable: true, onDelete: 'SET NULL' }
    )
    options?: Option[];
}
