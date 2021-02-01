import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class CoreDTO {
    // controls errors when using mutation 
    @Field(is => Boolean)
    accepted: boolean;
    
    @Field(is => String, { nullable: true })
    error?: string;
}
