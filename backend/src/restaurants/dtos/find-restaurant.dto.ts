import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreDTO } from './../../core/dtos/core.dto';
import { PaginationInput, PaginationOutput } from './../../core/dtos/pagination.dto';
import { Company } from './../entities/company.entity';
import { Brand } from './../entities/brand.entity';
import { Restaurant } from './../entities/restaurant.entity';
import { Keymap } from './../entities/keymap.entity';
import { Touchgroup } from './../entities/touchgroup.entity';
import { Item } from './../entities/item.entity';
import { Option } from './../entities/option.entity';
import { IsNumber } from 'class-validator';

@ObjectType()
export class FindCompaniesOutput extends CoreDTO {
    @Field(is => [Company], { nullable: true })
        companies?: Company[];
}

@ObjectType()
export class FindBrandsOutput extends CoreDTO {
    @Field(is => [Brand], { nullable: true })
    brands?: Brand[];
}

@InputType()
export class FindRestaurantsInput extends PaginationInput {}

@ObjectType()
export class FindRestaurantsOutput extends PaginationOutput {
    @Field(is => [Restaurant], { nullable: true })
    restaurants?: Restaurant[];
}

@ObjectType()
export class FindKeymapsOutput extends CoreDTO {
    @Field(is => [Keymap], { nullable: true })
    keymaps?: Keymap[];
}

@ObjectType()
export class FindTouchgroupsOutput extends CoreDTO {
    @Field(is => [Touchgroup], { nullable: true })
    touchgroups?: Touchgroup[];
}

@ObjectType()
export class FindItemsOutput extends CoreDTO {
    @Field(is => [Item], { nullable: true })
    items?: Item[];
}

@ObjectType()
export class FindOptionsOutput extends CoreDTO {
    @Field(is => [Option], { nullable: true })
    options?: Option[];
}

@InputType()
export class FindCompanyInput {
    @Field(is => Number)
    @IsNumber()
    companyId: number;
}

@ObjectType()
export class FindCompanyOutput extends CoreDTO {
    @Field(is => Company, { nullable: true })
    company?: Company;
}

@InputType()
export class FindBrandInput {
    @Field(is => Number)
    @IsNumber()
    brandId: number;
}

@ObjectType()
export class FindBrandOutput extends CoreDTO {
    @Field(is => Brand, { nullable: true })
    brand?: Brand;
}

@InputType()
export class FindRestaurantInput {
    @Field(is => Number)
    @IsNumber()
    restaurantId: number;
}

@ObjectType()
export class FindRestaurantOutput extends CoreDTO {
    @Field(is => Restaurant, { nullable: true })
    restaurant?: Restaurant;
}

@InputType()
export class FindKeymapInput {
    @Field(is => Number)
    @IsNumber()
    keymapId: number;
}

@ObjectType()
export class FindKeymapOutput extends CoreDTO {
    @Field(is => Keymap, { nullable: true })
    keymap?: Keymap;
}

@InputType()
export class FindTouchgroupInput {
    @Field(is => Number)
    @IsNumber()
    touchgroupId: number;
}

@ObjectType()
export class FindTouchgroupOutput extends CoreDTO {
    @Field(is => Touchgroup, { nullable: true })
    touchgroup?: Touchgroup;
}

@InputType()
export class FindItemInput {
    @Field(is => Number)
    @IsNumber()
    itemId: number;
}

@ObjectType()
export class FindItemOutput extends CoreDTO {
    @Field(is => Item, { nullable: true })
    item?: Item;
}

@InputType()
export class FindOptionInput {
    @Field(is => Number)
    @IsNumber()
    optionId: number;
}

@ObjectType()
export class FindOptionOutput extends CoreDTO {
    @Field(is => Option, { nullable: true })
    option?: Option;
}
