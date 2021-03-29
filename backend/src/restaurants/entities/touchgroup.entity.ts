import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { CoreEntity } from './../../core/entities/core.entity';
import { IsNumber, IsString } from 'class-validator';
import { User } from './../../users/entities/user.entity';
import { Keymap } from './keymap.entity';
import { Item } from './item.entity';

@InputType("TouchgroupInputType", { isAbstract: true })
@ObjectType()
@Entity()
export class Touchgroup extends CoreEntity {
    @Field(is => String)
    @Column()
    @IsString()
    name: string;

    @Field(is => Keymap)
    @ManyToOne(
        type => Keymap,
        keymap => keymap.touchgroups,
        { onDelete: 'CASCADE' }
    )
    keymap: Keymap;

    @Field(is => User)
    @ManyToOne(
        type => User,
        user => user.touchgroups,
        { onDelete: 'CASCADE' }
    )
    owner: User;

    @RelationId((touchgroup: Touchgroup) => touchgroup.owner)
    @IsNumber()
    ownerId: number;

    @Field(is => [Item], { nullable: true })
    @OneToMany(
        type => Item,
        item => item.touchgroup,
        { nullable: true, onDelete: 'SET NULL' }
    )
    items?: Item[];
}
