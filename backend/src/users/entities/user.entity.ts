import { CoreEntity } from './../../core/entities/core.entity';
import { Field, InputType, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BeforeInsert, Column, Entity } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';
import { IsEmail, IsEnum } from 'class-validator';
import * as bcrypt from 'bcrypt';

enum UserRole {
    // guest도 추가해야 할까...?
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

    // password encryption 
    // use bcrypt for security 
    @BeforeInsert()
    async hashPassword(): Promise<void> {
        try {
            const SALT_ROUNDS = 11;
            this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
        } catch (e) {
            console.log(e);
            throw new InternalServerErrorException();
        }
    }
}
