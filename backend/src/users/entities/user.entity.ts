import { Field, InputType, ObjectType, registerEnumType } from '@nestjs/graphql';
import { CoreEntity } from './../../core/entities/core.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';
import { IsDate, IsEmail, IsEnum, IsString } from 'class-validator';
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
    @Column({ unique: true })
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

    @Column({ select: false })
    @Field(is => String)
    @IsString()
    password: string;

    @Column({ type: 'enum', enum: UserRole, default: UserRole.Client })
    @Field(is => UserRole)
    @IsEnum(UserRole)
    role: UserRole;

    @Column({ type: 'enum', enum: SignupMethod, default: SignupMethod.PocketMarket })
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

    @Column()
    @Field(is => Date)
    @IsDate()
    birthday: Date;

    // password encryption
    // use bcrypt for security
    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword(): Promise<void> {
        if(this.password) {
            try {
                const SALT_ROUNDS = 11;
                this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
            } catch (e) {
                throw new InternalServerErrorException();
            }
        }
    }

    async checkPassword(passwordInput: string): Promise<boolean> {
        try {
            const accepted = await bcrypt.compare(passwordInput, this.password);
            return accepted;
        } catch (e) {
            throw new InternalServerErrorException();
        }
    }
}
