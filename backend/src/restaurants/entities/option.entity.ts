import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, RelationId } from 'typeorm';
import { CoreEntity } from './../../core/entities/core.entity';
import { IsArray, IsNumber, IsString } from 'class-validator';
import { User } from './../../users/entities/user.entity';
import { Item } from './item.entity';

@InputType("OptionChoiceInputType", { isAbstract: true })
@ObjectType()
export class OptionChoice {
    @Field(is => String)
    @IsString()
    name: string;

    @Field(is => Int)
    @IsNumber()
    price: number;
}

@InputType("OptionInputType", { isAbstract: true })
@ObjectType()
@Entity()
export class Option extends CoreEntity {
    @Field(is => String)
    @Column()
    @IsString()
    name: string; // 얼음

    @Field(is => [OptionChoice])
    @Column("json")
    @IsArray()
    choices: OptionChoice[]; // 같은 array에 있으면 하나 선택하는 옵션 // 얼음 조금, 얼음 보통, 얼음 많이

    @Field(is => User)
    @ManyToOne(
        type => User,
        user => user.options,
        { onDelete: 'CASCADE' }
    )
    owner: User;

    @RelationId((option: Option) => option.owner)
    @IsNumber()
    ownerId: number;

    @Field(is => Item)
    @ManyToOne(
        type => Item,
        item => item.options,
        { onDelete: 'CASCADE' }
    )
    item: Item;
}
