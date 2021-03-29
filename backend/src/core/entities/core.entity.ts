import { Field, ObjectType } from "@nestjs/graphql";
import { IsDate, IsNumber } from "class-validator";
import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@ObjectType()
export class CoreEntity {
    // define commonly used properties
    @PrimaryGeneratedColumn()
    @Field(is => Number)
    @IsNumber()
    id: number;

    @CreateDateColumn()
    @Field(is => Date)
    @IsDate()
    createdAt: Date;

    @UpdateDateColumn()
    @Field(is => Date)
    @IsDate()
    updatedAt: Date;
}
