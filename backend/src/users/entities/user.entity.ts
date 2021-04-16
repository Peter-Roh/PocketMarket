import { Field, InputType, ObjectType, registerEnumType } from '@nestjs/graphql';
import { CoreEntity } from './../../core/entities/core.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';
import { IsBoolean, IsDate, IsEmail, IsEnum, IsString } from 'class-validator';
import { Company } from './../../restaurants/entities/company.entity';
import { Brand } from './../../restaurants/entities/brand.entity';
import { Restaurant } from './../../restaurants/entities/restaurant.entity';
import { Keymap } from './../../restaurants/entities/keymap.entity';
import { Touchgroup } from './../../restaurants/entities/touchgroup.entity';
import { Item } from './../../restaurants/entities/item.entity';
import { Option } from './../../restaurants/entities/option.entity';
import { Order } from './../../orders/entities/order.entity';
import * as bcrypt from 'bcrypt';

export enum UserRole {
    Client = "Client",
    Owner = "Owner",
    Admin = "Admin",
}

enum SignupMethod {
    PocketMarket,
//    Kakao,
//    Google,
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

@InputType("UserInputType", { isAbstract: true })
@ObjectType()
@Entity()
export class User extends CoreEntity {
    @Column({ unique: true })
    @Field(is => String)
    @IsEmail()
    email: string;

    @Column({ default: false })
    @Field(is => Boolean)
    @IsBoolean()
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
    method: SignupMethod;

    @Column({ nullable: true })
    @Field(is => String, { nullable: true })
    @IsString()
    profileImg?: string;

    @Column({ type: 'enum', enum: Gender, default: Gender.Unknown })
    @Field(is => Gender)
    @IsEnum(Gender)
    gender: Gender;

    @Column()
    @Field(is => Date)
    @IsDate()
    birthday: Date;

    @Column()
    @Field(is => String)
    @IsString()
    phoneNumber: string;

    @Field(is => [Company], { nullable: true })
    @OneToMany(
        type => Company,
        company => company.owner,
        { nullable: true, onDelete: 'SET NULL', eager: true }
    )
    companies?: Company[];

    @Field(is => [Brand], { nullable: true })
    @OneToMany(
        type => Brand,
        brand => brand.owner,
        { nullable: true, onDelete: 'SET NULL', eager: true }
    )
    brands?: Brand[];

    @Field(is => [Restaurant], { nullable: true })
    @OneToMany(
        type => Restaurant,
        restaurant => restaurant.owner,
        { nullable: true, onDelete: 'SET NULL' }
    )
    restaurants?: Restaurant[];

    @Field(is => [Restaurant], { nullable: true })
    @ManyToMany(
        type => Restaurant,
        restaurant => restaurant.likeUser,
        { nullable: true, onDelete: 'SET NULL' }
    )
    likeRestaurants?: Restaurant[];

    @Field(is => [Keymap], { nullable: true })
    @OneToMany(
        type => Keymap,
        keymap => keymap.owner,
        { nullable: true, onDelete: 'SET NULL' }
    )
    keymaps?: Keymap[];

    @Field(is => [Touchgroup], { nullable: true })
    @OneToMany(
        type => Touchgroup,
        touchgroup => touchgroup.owner,
        { nullable: true, onDelete: 'SET NULL' }
    )
    touchgroups?: Touchgroup[];

    @Field(is => [Item], { nullable: true })
    @OneToMany(
        type => Item,
        item => item.owner,
        { nullable: true, onDelete: 'SET NULL' }
    )
    items?: Item[];

    @Field(is => [Option], { nullable: true })
    @OneToMany(
        type => Option,
        option => option.owner,
        { nullable: true, onDelete: 'SET NULL' }
    )
    options?: Option[];

    @Field(is => [Order], { nullable: true })
    @OneToMany(
        is => Order,
        order => order.customer,
        { nullable: true, onDelete: 'SET NULL' }
    )
    orders?: Order[];

    // 게시물 좋아요

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
