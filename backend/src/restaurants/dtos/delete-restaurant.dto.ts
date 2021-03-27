import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { CoreDTO } from './../../core/dtos/core.dto';

// Company

@InputType()
export class DeleteCompanyInput {
    @Field(is => Number)
    companyId: number;
}

@ObjectType()
export class DeleteCompanyOutput extends CoreDTO {}

// Brand

@InputType()
export class DeleteBrandInput {
    @Field(is => Number)
    brandId: number;
}

@ObjectType()
export class DeleteBrandOutput extends CoreDTO {}

// Restaurant

@InputType()
export class DeleteRestaurantInput {
    @Field(is => Number)
    restaurantId: number;
}

@ObjectType()
export class DeleteRestaurantOutput extends CoreDTO {}

// Keymap

@InputType()
export class DeleteKeymapInput {
    @Field(is => Number)
    keymapId: number;
}

@ObjectType()
export class DeleteKeymapOutput extends CoreDTO {}

// Touchgroup

@InputType()
export class DeleteTouchgroupInput {
    @Field(is => Number)
    touchgroupId: number;
}

@ObjectType()
export class DeleteTouchgroupOutput extends CoreDTO {}

// Item

@InputType()
export class DeleteItemInput {
    @Field(is => Number)
    itemId: number;
}

@ObjectType()
export class DeleteItemOutput extends CoreDTO {}

// Option

@InputType()
export class DeleteOptionInput {
    @Field(is => Number)
    optionId: number;
}

@ObjectType()
export class DeleteOptionOutput extends CoreDTO {}
