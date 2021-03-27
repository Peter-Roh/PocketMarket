import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { CoreEntity } from './../../core/entities/core.entity';
import { IsString } from 'class-validator';
import { User } from './../../users/entities/user.entity';
import { Restaurant } from './restaurant.entity';
import { Touchgroup } from './touchgroup.entity';

@InputType("KeymapInputType", { isAbstract: true })
@ObjectType()
@Entity()
export class Keymap extends CoreEntity {
    @Field(is => String)
    @Column()
    @IsString()
    name: string;

    @Field(is => Restaurant)
    @ManyToOne(
        type => Restaurant,
        restaurant => restaurant.keymaps,
        { onDelete: 'CASCADE' }
    )
    restaurant: Restaurant;

    @Field(is => User)
    @ManyToOne(
        type => User,
        user => user.keymaps,
        { onDelete: 'CASCADE' }
    )
    owner: User;

    @RelationId((keymap: Keymap) => keymap.owner)
    ownerId: number;

    @Field(is => [Touchgroup], { nullable: true })
    @OneToMany(
        type => Touchgroup,
        touchgroup => touchgroup.keymap,
        { nullable: true, onDelete: 'SET NULL' }
    )
    touchgroups?: Touchgroup[];
}
