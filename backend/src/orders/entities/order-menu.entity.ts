import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { IsArray, IsNumber, IsString } from "class-validator";
import { Column, Entity, ManyToOne } from "typeorm";
import { CoreEntity } from './../../core/entities/core.entity';
import { Item } from './../../restaurants/entities/item.entity';

@InputType('OrderMenuOptionInputType', { isAbstract: true })
@ObjectType()
export class OrderMenuOption {
    @Field(is => String)
    @IsString()
    name: string;

    @Field(is => String)
    @IsString()
    choice: string;
}

@InputType('OrderMenuInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class OrderMenu extends CoreEntity {
    @Field(is => Item)
    @ManyToOne(is => Item, { onDelete: 'CASCADE', eager: true })
    item: Item;

    @Field(is => Int)
    @Column()
    @IsNumber()
    count: number;

    @Field(is => [OrderMenuOption], { nullable: true })
    @Column('json', { nullable: true })
    @IsArray()
    options?: OrderMenuOption[];
}
