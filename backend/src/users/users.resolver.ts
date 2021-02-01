import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { CreateAccountOutput, CreateAccountInput } from './dtos/create-account.dto';

@Resolver(of => User)
export class UsersResolver {
    constructor(private readonly usersService: UsersService) {}

    @Query(returns => Boolean)
    hi() {
        return true;
    }

    @Mutation(returns => CreateAccountOutput)
    async createAccount(@Args("input") createAccountInput: CreateAccountInput): Promise<CreateAccountOutput> {
        try {
            const { accepted, error } = await this.usersService.createAccount(createAccountInput);
            return {
                accepted,
                error
            }
        } catch (error) {
            return {
                accepted: false,
                error,
            }
        }
    }
}
