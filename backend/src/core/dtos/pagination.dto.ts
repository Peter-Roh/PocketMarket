import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { IsNumber } from "class-validator";
import { CoreDTO } from './core.dto';

@InputType()
export class PaginationInput {
    @Field(is => Int, { defaultValue: 1 })
    @IsNumber()
    page: number;
}

@ObjectType()
export class PaginationOutput extends CoreDTO {
    @Field(is => Int, { nullable: true })
    totalPages?: number;

    @Field(is => Int, { nullable: true })
    totalResults?: number;
}
