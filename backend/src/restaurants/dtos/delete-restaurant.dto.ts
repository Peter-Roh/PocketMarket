import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsNumber } from "class-validator";
import { CoreDTO } from './../../core/dtos/core.dto';

// Company

@InputType()
export class DeleteCompanyInput {
    @Field(is => Number)
    @IsNumber()
    companyId: number;
}

@ObjectType()
export class DeleteCompanyOutput extends CoreDTO {}

// Brand

@InputType()
export class DeleteBrandInput {
    @Field(is => Number)
    @IsNumber()
    brandId: number;
}

@ObjectType()
export class DeleteBrandOutput extends CoreDTO {}

// Restaurant

@InputType()
export class DeleteRestaurantInput {
    @Field(is => Number)
    @IsNumber()
    restaurantId: number;
}

@ObjectType()
export class DeleteRestaurantOutput extends CoreDTO {}

// Keymap

@InputType()
export class DeleteKeymapInput {
    @Field(is => Number)
    @IsNumber()
    keymapId: number;
}

@ObjectType()
export class DeleteKeymapOutput extends CoreDTO {}

// Touchgroup

@InputType()
export class DeleteTouchgroupInput {
    @Field(is => Number)
    @IsNumber()
    touchgroupId: number;
}

@ObjectType()
export class DeleteTouchgroupOutput extends CoreDTO {}

// Item

@InputType()
export class DeleteItemInput {
    @Field(is => Number)
    @IsNumber()
    itemId: number;
}

@ObjectType()
export class DeleteItemOutput extends CoreDTO {}

// Option

@InputType()
export class DeleteOptionInput {
    @Field(is => Number)
    @IsNumber()
    optionId: number;
}

@ObjectType()
export class DeleteOptionOutput extends CoreDTO {}
