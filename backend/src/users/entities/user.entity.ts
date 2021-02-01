import { CoreEntity } from './../../core/entities/core.entity';
import { Field, InputType, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BeforeInsert, Column, Entity } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';
import { IsEmail, IsEnum } from 'class-validator';
import * as bcrypt from 'bcrypt';

enum UserRole {
    Client,
    Owner,
}

registerEnumType(UserRole, { name: 'UserRole' });

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class User extends CoreEntity {
    @Column()
    @Field(is => String)
    @IsEmail()
    email: string;

    @Column()
    @Field(is => String)
    password: string;

    @Column({ type: 'enum', enum: UserRole })
    @Field(is => UserRole)
    @IsEnum(UserRole)
    role: UserRole;

    @BeforeInsert()
    async hashPassword(): Promise<void> {
        try {
            this.password = await bcrypt.hash(this.password, 11);
        } catch (e) {
            console.log(e);
            throw new InternalServerErrorException();
        }
    }
}
