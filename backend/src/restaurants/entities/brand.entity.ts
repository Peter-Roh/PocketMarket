import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { CoreEntity } from './../../core/entities/core.entity';
import { IsString } from 'class-validator';
import { Company } from './company.entity';
import { Restaurant } from './restaurant.entity';

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class Brand extends CoreEntity {
    @Field(is => String)
    @Column()
    @IsString()
    name: string;

    @Field(is => Company)
    @ManyToOne(type => Company, company => company.brands)
    company: Company;

    @Field(is => [Restaurant])
    @OneToMany(type => Restaurant, restaurant => restaurant.brand)
    restaurants: Restaurant[];
}
