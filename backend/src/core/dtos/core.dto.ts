import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class CoreDTO {
    // controls errors when using mutations 
    @Field(is => Boolean)
    accepted: boolean;
    
    @Field(is => String, { nullable: true })
    error?: string;
}
