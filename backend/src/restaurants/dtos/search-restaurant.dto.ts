import { InputType, Field, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { PaginationInput, PaginationOutput } from './../../core/dtos/pagination.dto';
import { Restaurant } from './../entities/restaurant.entity';

@InputType()
export class SearchRestaurantInput extends PaginationInput {
    @Field(is => String)
    @IsString()
    query: string;
}

@ObjectType()
export class SearchRestaurantOutput extends PaginationOutput {
    @Field(is => [Restaurant], { nullable: true })
    restaurants?: Restaurant[];
}
