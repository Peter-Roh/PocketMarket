import { CoreEntity } from './../../core/entities/core.entity';
import { Field, InputType, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BeforeInsert, Column, Entity } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';
import { IsEmail, IsEnum, IsString } from 'class-validator';
import * as bcrypt from 'bcrypt';

enum UserRole {
    Client,
    Owner,
}

enum SignupMethod {
    PocketMarket,
    Kakao,
}

enum Gender {
    Male,
    Female,
    Other,
    Unknown,
}

registerEnumType(UserRole, { name: 'UserRole' });
registerEnumType(SignupMethod, { name: 'SignupMethod' });
registerEnumType(Gender, { name: 'Gender' });

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class User extends CoreEntity {
    @Column()
    @Field(is => String)
    @IsEmail()
    email: string;

    @Column({ default: false })
    @Field(is => Boolean)
    verified: boolean;

    @Column()
    @Field(is => String)
    @IsString()
    nickname: string;

    @Column()
    @Field(is => String)
    @IsString()
    password: string;

    @Column({ type: 'enum', enum: UserRole })
    @Field(is => UserRole)
    @IsEnum(UserRole)
    role: UserRole;

    @Column({ type: 'enum', enum: SignupMethod })
    @Field(is => SignupMethod)
    @IsEnum(SignupMethod)
    method: SignupMethod

    @Column({ nullable: true })
    @Field(is => String)
    profileImg?: string;

    @Column({ type: 'enum', enum: Gender, default: Gender.Unknown })
    @Field(is => Gender)
    @IsEnum(Gender)
    gender: Gender

    // birthday


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

    async checkPassword(passwordInput: string): Promise<boolean> {
        try {
            const accepted = await bcrypt.compare(passwordInput, this.password);
            return accepted;
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException();
        }
    }
}
