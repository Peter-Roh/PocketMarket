import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { Company } from './../entities/company.entity';
import { Brand } from './../entities/brand.entity';
import { Restaurant } from './../entities/restaurant.entity';
import { Keymap } from './../entities/keymap.entity';
import { Touchgroup } from './../entities/touchgroup.entity';
import { Item } from './../entities/item.entity';
import { Option } from './../entities/option.entity';
import { CoreDTO } from './../../core/dtos/core.dto';

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
    itemId: number;
}

@ObjectType()
export class CreateOptionOutput extends CoreDTO {}
