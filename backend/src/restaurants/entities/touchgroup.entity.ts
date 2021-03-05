import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';
import { CoreEntity } from './../../core/entities/core.entity';
import { IsString } from 'class-validator';

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class Touchgroup extends CoreEntity {
    @Field(is => String)
    @Column()
    @IsString()
    name: string;
}
