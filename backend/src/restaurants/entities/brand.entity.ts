import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { CoreEntity } from './../../core/entities/core.entity';
import { IsNumber, IsString } from 'class-validator';
import { User } from './../../users/entities/user.entity';
import { Company } from './company.entity';
import { Restaurant } from './restaurant.entity';

@InputType("BrandInputType", { isAbstract: true })
@ObjectType()
@Entity()
export class Brand extends CoreEntity {
    @Field(is => String)
    @Column()
    @IsString()
    name: string;

    @Field(is => User)
    @ManyToOne(
        type => User,
        user => user.brands,
        { onDelete: 'CASCADE' }
    )
    owner: User;

    @RelationId((brand: Brand) => brand.owner)
    @IsNumber()
    ownerId: number;

    @Field(is => Company)
    @ManyToOne(
        type => Company,
        company => company.brands,
        { onDelete: 'CASCADE' }
    )
    company: Company;

    @Field(is => [Restaurant], { nullable: true })
    @OneToMany(
        type => Restaurant,
        restaurant => restaurant.brand,
        { nullable: true, onDelete: 'SET NULL' }
    )
    restaurants?: Restaurant[];
}
