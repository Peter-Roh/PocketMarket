import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany } from 'typeorm';
import { CoreEntity } from './../../core/entities/core.entity';
import { IsString } from 'class-validator';
import { Brand } from './brand.entity';

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class Company extends CoreEntity {
    @Field(is => String)
    @Column()
    @IsString()
    name: string;

    @Field(is => [Brand])
    @OneToMany(type => Brand, brand => brand.company)
    brands: Brand[];
}
