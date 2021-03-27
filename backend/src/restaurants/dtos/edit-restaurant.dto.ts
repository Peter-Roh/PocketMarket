import { Field, InputType, ObjectType, PartialType, PickType } from "@nestjs/graphql";
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
    @Field(is => Number)
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
    @Field(is => Number)
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
    @Field(is => Number)
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
    @Field(is => Number)
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
    @Field(is => Number)
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
    @Field(is => Number)
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
    @Field(is => Number)
    optionId: number;
}

@ObjectType()
export class EditOptionOutput extends CoreDTO {}
