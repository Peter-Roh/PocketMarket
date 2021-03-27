import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { CoreEntity } from './../../core/entities/core.entity';
import { IsString } from 'class-validator';
import { User } from './../../users/entities/user.entity';
import { Brand } from './brand.entity';

@InputType("CompanyInputType", { isAbstract: true })
@ObjectType()
@Entity()
export class Company extends CoreEntity {
    @Field(is => String)
    @Column()
    @IsString()
    name: string;

    @Field(is => User)
    @ManyToOne(
        type => User,
        user => user.companies,
        { onDelete: 'CASCADE' }
    )
    owner: User;

    @RelationId((company: Company) => company.owner)
    ownerId: number;

    @Field(is => [Brand], { nullable: true })
    @OneToMany(
        type => Brand,
        brand => brand.company,
        { nullable: true, onDelete: 'SET NULL' }
    )
    brands?: Brand[];
}
