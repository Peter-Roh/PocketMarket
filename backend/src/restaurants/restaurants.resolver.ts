import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantsService } from './restaurants.service';
import { User } from './../users/entities/user.entity';
import { AuthUser } from './../auth/auth-user.decorator';
import { Role } from 'src/auth/role.decorator';
import { CoreDTO } from './../core/dtos/core.dto';
import { 
    CreateCompanyInput,
    CreateCompanyOutput,
    CreateBrandInput,
    CreateBrandOutput,
    CreateRestaurantInput,
    CreateRestaurantOutput,
    CreateKeymapInput,
    CreateKeymapOutput,
    CreateTouchgroupInput,
    CreateTouchgroupOutput,
    CreateItemInput,
    CreateItemOutput,
    CreateOptionInput,
    CreateOptionOutput,
} from './dtos/create-restaurant.dto';
import {
    EditCompanyInput,
    EditCompanyOutput,
    EditBrandInput,
    EditBrandOutput,
    EditRestaurantInput,
    EditRestaurantOutput,
    EditKeymapInput,
    EditKeymapOutput,
    EditTouchgroupInput,
    EditTouchgroupOutput,
    EditItemInput,
    EditItemOutput,
    EditOptionInput,
    EditOptionOutput,
} from './dtos/edit-restaurant.dto';
import {
    DeleteCompanyInput,
    DeleteCompanyOutput,
    DeleteBrandInput,
    DeleteBrandOutput,
    DeleteRestaurantInput,
    DeleteRestaurantOutput,
    DeleteKeymapInput,
    DeleteKeymapOutput,
    DeleteTouchgroupInput,
    DeleteTouchgroupOutput,
    DeleteItemInput,
    DeleteItemOutput,
    DeleteOptionInput,
    DeleteOptionOutput,
} from './dtos/delete-restaurant.dto';
import {
    FindCompaniesOutput,
    FindBrandsOutput,
    FindRestaurantsOutput,
    FindKeymapsOutput,
    FindTouchgroupsOutput,
    FindItemsOutput,
    FindOptionsOutput,
    FindCompanyOutput,
    FindBrandOutput,
    FindRestaurantOutput,
    FindKeymapOutput,
    FindTouchgroupOutput,
    FindItemOutput,
    FindOptionOutput,
    FindCompanyInput,
    FindBrandInput,
    FindRestaurantInput,
    FindKeymapInput,
    FindTouchgroupInput,
    FindItemInput,
    FindOptionInput,
} from './dtos/find-restaurant.dto';

@Resolver(of => Restaurant)
export class RestaurantsResolver {
    constructor(private readonly restaurantsService: RestaurantsService) {}

    // create

    @Mutation(returns => CreateCompanyOutput)
    @Role(['Owner', 'Admin'])
    async createCompany(
        @AuthUser() authUser: User,
        @Args('input') createCompanyInput: CreateCompanyInput,
    ): Promise<CreateCompanyOutput> {
        return this.restaurantsService.createCompany(authUser, createCompanyInput);
    }

    @Mutation(returns => CreateBrandOutput)
    @Role(['Owner', 'Admin'])
    async createBrand(
        @AuthUser() authUser: User,
        @Args('input') createBrandInput: CreateBrandInput,
    ): Promise<CreateBrandOutput> {
        return this.restaurantsService.createBrand(authUser, createBrandInput);
    }

    @Mutation(returns => CreateRestaurantOutput)
    @Role(['Owner', 'Admin'])
    async createRestaurant(
        @AuthUser() authUser: User,
        @Args('input') createRestaurantInput: CreateRestaurantInput,
    ): Promise<CreateRestaurantOutput> {
        return this.restaurantsService.createRestaurant(authUser, createRestaurantInput);
    }

    @Mutation(returns => CreateKeymapOutput)
    @Role(['Owner', 'Admin'])
    async createKeymap(
        @AuthUser() authUser: User,
        @Args('input') createKeymapInput: CreateKeymapInput,
    ): Promise<CreateKeymapOutput> {
        return this.restaurantsService.createKeymap(authUser, createKeymapInput);
    }

    @Mutation(returns => CreateTouchgroupOutput)
    @Role(['Owner', 'Admin'])
    async createTouchgroup(
        @AuthUser() authUser: User,
        @Args('input') createTouchgroupInput: CreateTouchgroupInput,
    ): Promise<CreateTouchgroupOutput> {
        return this.restaurantsService.createTouchgroup(authUser, createTouchgroupInput);
    }

    @Mutation(returns => CreateItemOutput)
    @Role(['Owner', 'Admin'])
    async createItem(
        @AuthUser() authUser: User,
        @Args('input') createItemInput: CreateItemInput,
    ): Promise<CreateItemOutput> {
        return this.restaurantsService.createItem(authUser, createItemInput);
    }

    @Mutation(returns => CreateOptionOutput)
    @Role(['Owner', 'Admin'])
    async createOption(
        @AuthUser() authUser: User,
        @Args('input') createOptionInput: CreateOptionInput,
    ): Promise<CreateOptionOutput> {
        return this.restaurantsService.createOption(authUser, createOptionInput);
    }

    // edit

    @Mutation(returns => EditCompanyOutput)
    @Role(['Owner', 'Admin'])
    async editCompany(
        @AuthUser() authUser: User,
        @Args('input') editCompanyInput: EditCompanyInput,
    ): Promise<EditCompanyOutput> {
        return this.restaurantsService.editCompany(authUser, editCompanyInput);
    }

    @Mutation(returns => EditBrandOutput)
    @Role(['Owner', 'Admin'])
    async editBrand(
        @AuthUser() authUser: User,
        @Args('input') editBrandInput: EditBrandInput,
    ): Promise<EditBrandOutput> {
        return this.restaurantsService.editBrand(authUser, editBrandInput);
    }

    @Mutation(returns => EditRestaurantOutput)
    @Role(['Owner', 'Admin'])
    async editRestaurant(
        @AuthUser() authUser: User,
        @Args('input') editRestaurantInput: EditRestaurantInput,
    ): Promise<EditRestaurantOutput> {
        return this.restaurantsService.editRestaurant(authUser, editRestaurantInput);
    }

    @Mutation(returns => EditKeymapOutput)
    @Role(['Owner', 'Admin'])
    async editKeymap(
        @AuthUser() authUser: User,
        @Args('input') editKeymapInput: EditKeymapInput,
    ): Promise<EditKeymapOutput> {
        return this.restaurantsService.editKeymap(authUser, editKeymapInput);
    }

    @Mutation(returns => EditTouchgroupOutput)
    @Role(['Owner', 'Admin'])
    async editTouchgroup(
        @AuthUser() authUser: User,
        @Args('input') editTouchgroupInput: EditTouchgroupInput,
    ): Promise<EditTouchgroupOutput> {
        return this.restaurantsService.editTouchgroup(authUser, editTouchgroupInput);
    }

    @Mutation(returns => EditItemOutput)
    @Role(['Owner', 'Admin'])
    async editItem(
        @AuthUser() authUser: User,
        @Args('input') editItemInput: EditItemInput,
    ): Promise<EditItemOutput> {
        return this.restaurantsService.editItem(authUser, editItemInput);
    }

    @Mutation(returns => EditOptionOutput)
    @Role(['Owner', 'Admin'])
    async editOption(
        @AuthUser() authUser: User,
        @Args('input') editOptionInput: EditOptionInput,
    ): Promise<EditOptionOutput> {
        return this.restaurantsService.editOption(authUser, editOptionInput);
    }

    // delete

    @Mutation(returns => DeleteCompanyOutput)
    @Role(['Owner', 'Admin'])
    deleteCompany(
        @AuthUser() owner: User,
        @Args('input') deleteCompanyInput: DeleteCompanyInput,
    ): Promise<DeleteCompanyOutput> {
        return this.restaurantsService.deleteCompany(owner, deleteCompanyInput);
    }

    @Mutation(returns => DeleteBrandOutput)
    @Role(['Owner', 'Admin'])
    deleteBrand(
        @AuthUser() owner: User,
        @Args('input') deleteBrandInput: DeleteBrandInput,
    ): Promise<DeleteBrandOutput> {
        return this.restaurantsService.deleteBrand(owner, deleteBrandInput);
    }

    @Mutation(returns => DeleteRestaurantOutput)
    @Role(['Owner', 'Admin'])
    deleteRestaurant(
        @AuthUser() owner: User,
        @Args('input') deleteRestaurantInput: DeleteRestaurantInput,
    ): Promise<DeleteRestaurantOutput> {
        return this.restaurantsService.deleteRestaurant(owner, deleteRestaurantInput);
    }

    @Mutation(returns => DeleteKeymapOutput)
    @Role(['Owner', 'Admin'])
    deleteKeymap(
        @AuthUser() owner: User,
        @Args('input') deleteKeymapInput: DeleteKeymapInput,
    ): Promise<DeleteKeymapOutput> {
        return this.restaurantsService.deleteKeymap(owner, deleteKeymapInput);
    }

    @Mutation(returns => DeleteTouchgroupOutput)
    @Role(['Owner', 'Admin'])
    deleteTouchgroup(
        @AuthUser() owner: User,
        @Args('input') deleteTouchgroupInput: DeleteTouchgroupInput,
    ): Promise<DeleteTouchgroupOutput> {
        return this.restaurantsService.deleteTouchgroup(owner, deleteTouchgroupInput);
    }

    @Mutation(returns => DeleteItemOutput)
    @Role(['Owner', 'Admin'])
    deleteItem(
        @AuthUser() owner: User,
        @Args('input') deleteItemInput: DeleteItemInput,
    ): Promise<DeleteItemOutput> {
        return this.restaurantsService.deleteItem(owner, deleteItemInput);
    }

    @Mutation(returns => DeleteOptionOutput)
    @Role(['Owner', 'Admin'])
    deleteOption(
        @AuthUser() owner: User,
        @Args('input') deleteOptionInput: DeleteOptionInput,
    ): Promise<DeleteOptionOutput> {
        return this.restaurantsService.deleteOption(owner, deleteOptionInput);
    }

    // find
    // find all

    @Query(returns => FindCompaniesOutput)
    getCompanies(): Promise<FindCompaniesOutput> {
        return this.restaurantsService.getCompanies();
    }

    @Query(returns => FindBrandsOutput)
    getBrands(): Promise<FindBrandsOutput> {
        return this.restaurantsService.getBrands();
    }

    @Query(returns => FindRestaurantsOutput)
    getRestaurants(): Promise<FindRestaurantsOutput> {
        return this.restaurantsService.getRestaurants();
    }

    @Query(returns => FindKeymapsOutput)
    getKeymaps(): Promise<FindKeymapsOutput> {
        return this.restaurantsService.getKeymaps();
    }

    @Query(returns => FindTouchgroupsOutput)
    getTouchgroups(): Promise<FindTouchgroupsOutput> {
        return this.restaurantsService.getTouchgroups();
    }

    @Query(returns => FindItemsOutput)
    getItems(): Promise<FindItemsOutput> {
        return this.restaurantsService.getItems();
    }

    @Query(returns => FindOptionsOutput)
    getOptions(): Promise<FindOptionsOutput> {
        return this.restaurantsService.getOptions();
    }

    // get mine

    @Query(returns => FindCompaniesOutput)
    @Role(['Owner'])
    getMyCompanies(
        @AuthUser() owner: User,
    ): Promise<FindCompaniesOutput> {
        return this.restaurantsService.getMyCompanies(owner);
    }

    @Query(returns => FindBrandsOutput)
    @Role(['Owner'])
    getMyBrands(
        @AuthUser() owner: User,
    ): Promise<FindBrandsOutput> {
        return this.restaurantsService.getMyBrands(owner);
    }

    @Query(returns => FindRestaurantsOutput)
    @Role(['Owner'])
    getMyRestaurants(
        @AuthUser() owner: User,
    ): Promise<FindRestaurantsOutput> {
        return this.restaurantsService.getMyRestaurants(owner);
    }

    @Query(returns => FindKeymapsOutput)
    @Role(['Owner'])
    getMyKeymaps(
        @AuthUser() owner: User,
    ): Promise<FindKeymapsOutput> {
        return this.restaurantsService.getMyKeymaps(owner);
    }

    @Query(returns => FindTouchgroupsOutput)
    @Role(['Owner'])
    getMyTouchgroups(
        @AuthUser() owner: User,
    ): Promise<FindTouchgroupsOutput> {
        return this.restaurantsService.getMyTouchgroups(owner);
    }

    @Query(returns => FindItemsOutput)
    @Role(['Owner'])
    getMyItems(
        @AuthUser() owner: User,
    ): Promise<FindItemsOutput> {
        return this.restaurantsService.getMyItems(owner);
    }

    @Query(returns => FindOptionsOutput)
    @Role(['Owner'])
    getMyOptions(
        @AuthUser() owner: User,
    ): Promise<FindOptionsOutput> {
        return this.restaurantsService.getMyOptions(owner);
    }

    // find one by id

    @Query(returns => FindCompanyOutput)
    getCompanyById(@Args('input') findCompanyInput: FindCompanyInput): Promise<FindCompanyOutput> {
        return this.restaurantsService.getCompanyById(findCompanyInput);
    }

    @Query(returns => FindBrandOutput)
    getBrandById(@Args('input') findBrandInput: FindBrandInput): Promise<FindBrandOutput> {
        return this.restaurantsService.getBrandById(findBrandInput);
    }

    @Query(returns => FindRestaurantOutput)
    getRestaurantById(@Args('input') findRestaurantInput: FindRestaurantInput): Promise<FindRestaurantOutput> {
        return this.restaurantsService.getRestaurantById(findRestaurantInput);
    }

    @Query(returns => FindKeymapOutput)
    getKeymapById(@Args('input') findKeymapInput: FindKeymapInput): Promise<FindKeymapOutput> {
        return this.restaurantsService.getKeymapById(findKeymapInput);
    }

    @Query(returns => FindTouchgroupOutput)
    getTouchgroupById(@Args('input') findTouchgroupInput: FindTouchgroupInput): Promise<FindTouchgroupOutput> {
        return this.restaurantsService.getTouchgroupById(findTouchgroupInput);
    }

    @Query(returns => FindItemOutput)
    getItemById(@Args('input') findItemInput: FindItemInput): Promise<FindItemOutput> {
        return this.restaurantsService.getItemById(findItemInput);
    }

    @Query(returns => FindOptionOutput)
    getOptionById(@Args('input') findOptionInput: FindOptionInput): Promise<FindOptionOutput> {
        return this.restaurantsService.getOptionById(findOptionInput);
    }

    // count

    @Query(returns => Int)
    countCompanies(): Promise<number> {
        return this.restaurantsService.countCompanies();
    }

    @Query(returns => Int)
    countBrands(): Promise<number> {
        return this.restaurantsService.countBrands();
    }

    @Query(returns => Int)
    countRestaurants(): Promise<number> {
        return this.restaurantsService.countRestaurants();
    }

    @Query(returns => Int)
    countKeymaps(): Promise<number> {
        return this.restaurantsService.countKeymaps();
    }

    @Query(returns => Int)
    countTouchgroups(): Promise<number> {
        return this.restaurantsService.countTouchgroups();
    }

    @Query(returns => Int)
    countItems(): Promise<number> {
        return this.restaurantsService.countItems();
    }

    @Query(returns => Int)
    countOptions(): Promise<number> {
        return this.restaurantsService.countOptions();
    }

    // open / close restaurant

    @Mutation(returns => CoreDTO)
    @Role(['Owner'])
    openRestaurant(
        @AuthUser() owner: User,
        @Args('input') findRestaurantInput: FindRestaurantInput,
    ): Promise<CoreDTO> {
        return this.restaurantsService.openRestaurant(owner, findRestaurantInput);
    }

    @Mutation(returns => CoreDTO)
    @Role(['Owner'])
    closeRestaurant(
        @AuthUser() owner: User,
        @Args('input') findRestaurantInput: FindRestaurantInput,
    ): Promise<CoreDTO> {
        return this.restaurantsService.closeRestaurant(owner, findRestaurantInput);
    }
}
