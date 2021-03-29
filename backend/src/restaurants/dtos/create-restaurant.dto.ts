import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { Company } from './../entities/company.entity';
import { Brand } from './../entities/brand.entity';
import { Restaurant } from './../entities/restaurant.entity';
import { Keymap } from './../entities/keymap.entity';
import { Touchgroup } from './../entities/touchgroup.entity';
import { Item } from './../entities/item.entity';
import { Option } from './../entities/option.entity';
import { CoreDTO } from './../../core/dtos/core.dto';
import { IsNumber } from "class-validator";

// Company

@InputType()
export class CreateCompanyInput extends PickType(Company, [
    "name",
]) {}

@ObjectType()
export class CreateCompanyOutput extends CoreDTO {}

// Brand

@InputType()
export class CreateBrandInput extends PickType(Brand, [
    "name",
]) {
    @Field(is => Number)
    @IsNumber()
    companyId: number;
}

@ObjectType()
export class CreateBrandOutput extends CoreDTO {}

// Restaurant

@InputType()
export class CreateRestaurantInput extends PickType(Restaurant, [
    'name',
    'coverImg',
    'address',
    'phoneNumber',
    "description",
]) {
    @Field(is => Number)
    @IsNumber()
    brandId: number;
}

@ObjectType()
export class CreateRestaurantOutput extends CoreDTO {}

// Keymap

@InputType()
export class CreateKeymapInput extends PickType(Keymap, [
    "name",
]) {
    @Field(is => Number)
    @IsNumber()
    restaurantId: number;
}

@ObjectType()
export class CreateKeymapOutput extends CoreDTO {}

// Touchgroup

@InputType()
export class CreateTouchgroupInput extends PickType(Touchgroup, [
    "name",
]) {
    @Field(is => Number)
    @IsNumber()
    keymapId: number;
}

@ObjectType()
export class CreateTouchgroupOutput extends CoreDTO {}

// Item

@InputType()
export class CreateItemInput extends PickType(Item, [
    "name",
    "itemImg",
    "price",
]) {
    @Field(is => Number)
    @IsNumber()
    touchgroupId: number;
}

@ObjectType()
export class CreateItemOutput extends CoreDTO {}

// Option

@InputType()
export class CreateOptionInput extends PickType(Option, [
    "name",
    "price",
]) {
    @Field(is => Number)
    @IsNumber()
    itemId: number;
}

@ObjectType()
export class CreateOptionOutput extends CoreDTO {}
