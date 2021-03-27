import { Field, ObjectType } from '@nestjs/graphql';
import { CoreDTO } from './../../core/dtos/core.dto';
import { Company } from './../entities/company.entity';
import { Brand } from './../entities/brand.entity';
import { Restaurant } from './../entities/restaurant.entity';
import { Keymap } from './../entities/keymap.entity';
import { Touchgroup } from './../entities/touchgroup.entity';
import { Item } from './../entities/item.entity';
import { Option } from './../entities/option.entity';

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

@ObjectType()
export class FindRestaurantsOutput extends CoreDTO {
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
