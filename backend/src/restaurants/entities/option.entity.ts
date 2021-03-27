import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, RelationId } from 'typeorm';
import { CoreEntity } from './../../core/entities/core.entity';
import { IsNumber, IsString } from 'class-validator';
import { User } from './../../users/entities/user.entity';
import { Item } from './item.entity';

@InputType("OptionInputType", { isAbstract: true })
@ObjectType()
@Entity()
export class Option extends CoreEntity {
    @Field(is => [String])
    @Column("character", { array: true })
    @IsString({ each: true })
    name: string[]; // 같은 array에 있으면 하나 선택하는 옵션

    @Field(is => Int)
    @Column()
    @IsNumber()
    price: number;

    @Field(is => User)
    @ManyToOne(
        type => User,
        user => user.options,
        { onDelete: 'CASCADE' }
    )
    owner: User;

    @RelationId((option: Option) => option.owner)
    ownerId: number;

    @Field(is => Item)
    @ManyToOne(
        type => Item,
        item => item.options,
        { onDelete: 'CASCADE' }
    )
    item: Item;
}
