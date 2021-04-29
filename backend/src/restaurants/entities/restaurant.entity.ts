import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { CoreEntity } from './../../core/entities/core.entity';
import { IsBoolean, IsNumber, IsPhoneNumber, IsString } from 'class-validator';
import { Brand } from './brand.entity';
import { User } from './../../users/entities/user.entity';
import { Keymap } from './keymap.entity';
import { Order } from './../../orders/entities/order.entity';

@InputType("RestaurantInputType", { isAbstract: true })
@ObjectType()
@Entity()
export class Restaurant extends CoreEntity {
    @Field(is => String)
    @Column()
    @IsString()
    name: string;

    @Field(is => String, { nullable: true })
    @Column({ nullable: true })
    @IsString()
    coverImg?: string;

    @Field(is => String)
    @Column()
    @IsString()
    address: string;

    @Field(is => String)
    @Column()
    @IsPhoneNumber('KR')
    phoneNumber: string;

    @Field(is => String, { nullable: true })
    @Column({ nullable: true })
    @IsString()
    description?: string;

    @Field(is => Boolean)
    @Column({ default: false})
    @IsBoolean()
    isOpen: boolean;

    @Field(is => User)
    @ManyToOne(
        type => User,
        user => user.restaurants,
        { onDelete: 'CASCADE', eager: true }
    )
    owner: User;

    @RelationId((restaurant: Restaurant) => restaurant.owner)
    @IsNumber()
    ownerId: number;

    @Field(is => Brand)
    @ManyToOne(
        type => Brand,
        brand => brand.restaurants,
        { onDelete: 'CASCADE' }
    )
    brand: Brand;

    @Field(is => [Keymap], { nullable: true })
    @OneToMany(
        type => Keymap,
        keymap => keymap.restaurant,
        { nullable: true, onDelete: 'SET NULL' }
    )
    keymaps?: Keymap[];

    @Field(is => [Order], { nullable: true })
    @OneToMany(
        is => Order,
        order => order.restaurant,
        { nullable: true, onDelete: 'SET NULL'}
    )
    orders?: Order[];
}
