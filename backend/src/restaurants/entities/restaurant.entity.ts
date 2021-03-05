import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne } from 'typeorm';
import { CoreEntity } from './../../core/entities/core.entity';
import { IsString } from 'class-validator';
import { Brand } from './brand.entity';

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class Restaurant extends CoreEntity {
    @Field(is => String)
    @Column()
    @IsString()
    name: string;

    @Field(is => String)
    @Column()
    @IsString()
    coverImg: string;

    @Field(is => String)
    @Column()
    @IsString()
    address: string;

    @Field(is => Brand)
    @ManyToOne(type => Brand, brand => brand.restaurants)
    brand: Brand;

    //keymap
}
