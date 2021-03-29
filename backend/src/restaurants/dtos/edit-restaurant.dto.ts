import { Field, InputType, Int, ObjectType, PartialType, PickType } from "@nestjs/graphql";
import { IsNumber } from "class-validator";
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
export class EditCompanyInput extends PartialType(
    PickType(
        Company, [
            "name",
        ]
    )
) {
    @Field(is => Int)
    @IsNumber()
    companyId: number;
}

@ObjectType()
export class EditCompanyOutput extends CoreDTO {}

// Brand

@InputType()
export class EditBrandInput extends PartialType(
    PickType(
        Brand, [
            "name",
        ]
    )
) {
    @Field(is => Int)
    @IsNumber()
    brandId: number;
}

@ObjectType()
export class EditBrandOutput extends CoreDTO {}

// Restaurant

@InputType()
export class EditRestaurantInput extends PartialType(
    PickType(
        Restaurant, [
            "name",
            "coverImg",
            "address",
            "phoneNumber",
            "brand",
            "keymaps",
        ]
    )
) {
    @Field(is => Int)
    @IsNumber()
    restaurantId: number;
}

@ObjectType()
export class EditRestaurantOutput extends CoreDTO {}

// Keymap

@InputType()
export class EditKeymapInput extends PartialType(
    PickType(
        Keymap, [
            "name",
        ]
    )
) {
    @Field(is => Int)
    @IsNumber()
    keymapId: number;
}

@ObjectType()
export class EditKeymapOutput extends CoreDTO {}

// Touchgroup

@InputType()
export class EditTouchgroupInput extends PartialType(
    PickType(
        Touchgroup, [
            "name",
        ]
    )
) {
    @Field(is => Int)
    @IsNumber()
    touchgroupId: number;
}

@ObjectType()
export class EditTouchgroupOutput extends CoreDTO {}

// Item

@InputType()
export class EditItemInput extends PartialType(
    PickType(
        Item, [
            "name",
            "itemImg",
            "price",
            "isSoldOut",
        ]
    )
) {
    @Field(is => Int)
    @IsNumber()
    itemId: number;
}

@ObjectType()
export class EditItemOutput extends CoreDTO {}

// Option

@InputType()
export class EditOptionInput extends PartialType(
    PickType(
        Option, [
            "name",
            "price",
        ]
    )
) {
    @Field(is => Int)
    @IsNumber()
    optionId: number;
}

@ObjectType()
export class EditOptionOutput extends CoreDTO {}
