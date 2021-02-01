import { Field } from "@nestjs/graphql";
import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class CoreEntity {
    // define commonly used properties
    @PrimaryGeneratedColumn()
    @Field(is => Number)
    id: number;

    // ?? Date는 한국 시각으로 어디서 어떻게 설정할까
    @CreateDateColumn()
    @Field(is => Date)
    createdAt: Date;

    @UpdateDateColumn()
    @Field(is => Date)
    updatedAt: Date;
}
