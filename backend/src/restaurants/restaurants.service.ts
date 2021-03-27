import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { Company } from './entities/company.entity';
import { Brand } from './entities/brand.entity';
import { Restaurant } from './entities/restaurant.entity';
import { Keymap } from './entities/keymap.entity';
import { Touchgroup } from './entities/touchgroup.entity';
import { Item } from './entities/item.entity';
import { Option } from './entities/option.entity';
import { User } from './../users/entities/user.entity';
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
    EditBrandInput,
    EditBrandOutput,
    EditCompanyInput,
    EditCompanyOutput,
    EditItemInput,
    EditItemOutput,
    EditKeymapInput,
    EditKeymapOutput,
    EditOptionInput,
    EditOptionOutput,
    EditRestaurantInput,
    EditRestaurantOutput,
    EditTouchgroupInput,
    EditTouchgroupOutput,
} from "./dtos/edit-restaurant.dto";
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
} from './dtos/find-restaurant.dto';

@Injectable()
export class RestaurantsService {
    constructor(
        @InjectRepository(Company) private readonly companies: Repository<Company>,
        @InjectRepository(Brand) private readonly brands: Repository<Brand>,
        @InjectRepository(Restaurant) private readonly restaurants: Repository<Restaurant>,
        @InjectRepository(Keymap) private readonly keymaps: Repository<Keymap>,
        @InjectRepository(Touchgroup) private readonly touchgroups: Repository<Touchgroup>,
        @InjectRepository(Item) private readonly items: Repository<Item>,
        @InjectRepository(Option) private readonly options: Repository<Option>,
    ) {}

    // create

    async createCompany(
        owner: User,
        createCompanyInput: CreateCompanyInput,
    ): Promise<CreateCompanyOutput> {
        try {
            const newCompany = this.companies.create(createCompanyInput);
            if(owner.id !== newCompany.ownerId) {
                return {
                    accepted: false,
                    error: "Authorization failed"
                };
            }
            newCompany.owner = owner;
            await this.companies.save(newCompany);
            return {
                accepted: true,
            };
        } catch (e) {
            return {
                accepted: false,
                error: "Creating company failed"
            }
        }
    }

    async createBrand(
        owner: User,
        createBrandInput: CreateBrandInput,
    ): Promise<CreateBrandOutput> {
        try {
            const newBrand = this.brands.create(createBrandInput);
            if(owner.id !== newBrand.ownerId) {
                return {
                    accepted: false,
                    error: "Authorization failed"
                };
            }
            newBrand.owner = owner;
            const company = await this.companies.findOne(
                createBrandInput.companyId, 
                { loadRelationIds: true }
            );
            if(!company) {
                return {
                    accepted: false,
                    error: "No company designated"
                };
            }
            newBrand.company = company;
            await this.brands.save(newBrand);
            return {
                accepted: true,
            };
        } catch (e) {
            return {
                accepted: false,
                error: "Creating brand failed"
            }
        }
    }

    async createRestaurant(
        owner: User,
        createRestaurantInput: CreateRestaurantInput,
    ): Promise<CreateRestaurantOutput> {
        try {
            const newRestaurant = this.restaurants.create(createRestaurantInput);
            if(owner.id !== newRestaurant.ownerId) {
                return {
                    accepted: false,
                    error: "Authorization failed"
                };
            }
            newRestaurant.owner = owner;
            const brand = await this.brands.findOne(
                createRestaurantInput.brandId,
                { loadRelationIds: true }
            );
            if(!brand) {
                return {
                    accepted: false,
                    error: "No brand designated"
                };
            }
            newRestaurant.brand = brand;
            await this.restaurants.save(newRestaurant);
            return {
                accepted: true,
            };
        } catch (e) {
            return {
                accepted: false,
                error: "Creating restaurant failed"
            };
        }
    }

    async createKeymap(
        owner: User,
        createKeymapInput: CreateKeymapInput,
    ): Promise<CreateKeymapOutput> {
        try {
            const newKeymap = this.keymaps.create(createKeymapInput);
            if(owner.id !== newKeymap.ownerId) {
                return {
                    accepted: false,
                    error: "Authorization failed"
                };
            }
            newKeymap.owner = owner;
            const restaurant = await this.restaurants.findOne(
                createKeymapInput.restaurantId,
                { loadRelationIds: true }
            );
            if(!restaurant) {
                return {
                    accepted: false,
                    error: "No restaurant designated"
                };
            }
            newKeymap.restaurant = restaurant;
            await this.keymaps.save(newKeymap);
            return {
                accepted: true,
            };
        } catch (e) {
            return {
                accepted: false,
                error: "Creating keymap failed"
            }
        }
    }

    async createTouchgroup(
        owner: User,
        createTouchgroupInput: CreateTouchgroupInput,
    ): Promise<CreateTouchgroupOutput> {
        try {
            const newTouchgroup = this.touchgroups.create(createTouchgroupInput);
            if(owner.id !== newTouchgroup.ownerId) {
                return {
                    accepted: false,
                    error: "Authorization failed"
                };
            }
            newTouchgroup.owner = owner;
            const keymap = await this.keymaps.findOne(
                createTouchgroupInput.keymapId,
                { loadRelationIds: true }
            );
            if(!keymap) {
                return {
                    accepted: false,
                    error: "No keymap designated"
                };
            }
            newTouchgroup.keymap = keymap;
            return {
                accepted: true,
            };
        } catch (e) {
            return {
                accepted: false,
                error: "Creating touchgroup failed"
            }
        }
    }

    async createItem(
        owner: User,
        createItemInput: CreateItemInput,
    ): Promise<CreateItemOutput> {
        try {
            const newItem = this.items.create(createItemInput);
            if(owner.id !== newItem.ownerId) {
                return {
                    accepted: false,
                    error: "Authorization failed"
                };
            }
            newItem.owner = owner;
            const touchgroup = await this.touchgroups.findOne(
                createItemInput.touchgroupId,
                { loadRelationIds: true }
            );
            if(!touchgroup) {
                return {
                    accepted: false,
                    error: "No touchgroup designated"
                };
            }
            newItem.touchgroup = touchgroup;
            await this.items.save(newItem);
            return {
                accepted: true,
            };
        } catch (e) {
            return {
                accepted: false,
                error: "Creating item failed"
            }
        }
    }

    async createOption(
        owner: User,
        createOptionInput: CreateOptionInput,
    ): Promise<CreateOptionOutput> {
        try {
            const newOption = this.options.create(createOptionInput);
            if(owner.id !== newOption.ownerId) {
                return {
                    accepted: false,
                    error: "Authorization failed"
                };
            }
            newOption.owner = owner;
            const item = await this.items.findOne(
                createOptionInput.itemId,
                { loadRelationIds: true }
            );
            if(!item) {
                return {
                    accepted: false,
                    error: "No item designated"
                };
            }
            newOption.item = item;
            await this.options.save(newOption);
            return {
                accepted: true,
            };
        } catch (e) {
            return {
                accepted: false,
                error: "Creating option failed"
            }
        }
    }

    // edit

    async editCompany(
        owner: User,
        editCompanyInput: EditCompanyInput,
    ): Promise<EditCompanyOutput> {
        try {
            const company = await this.companies.findOne(
                editCompanyInput.companyId,
                { loadRelationIds: true }
            );
            if(!company) {
                return {
                    accepted: false,
                    error: "Company Not Found",
                };
            }
            if(owner.id !== company.ownerId) {
                return {
                    accepted: false,
                    error: "Not permitted to edit"
                };
            }
            await this.companies.save([{
                id: editCompanyInput.companyId,
                ...editCompanyInput,
            }]);
        } catch (e) {
            return {
                accepted: false,
                error: "Could not edit company",
            };
        }
    }

    async editBrand(
        owner: User,
        editBrandInput: EditBrandInput,
    ): Promise<EditBrandOutput> {
        try {
            const brand = await this.brands.findOne(
                editBrandInput.brandId,
                { loadRelationIds: true }
            );
            if(!brand) {
                return {
                    accepted: false,
                    error: "Brand Not Found",
                };
            }
            if(owner.id !== brand.ownerId) {
                return {
                    accepted: false,
                    error: "Not permitted to edit"
                };
            }
            await this.brands.save([{
                id: editBrandInput.brandId,
                ...editBrandInput,
            }]);
        } catch (e) {
            return {
                accepted: false,
                error: "Could not edit brand",
            };
        }
    }

    async editRestaurant(
        owner: User,
        editRestaurantInput: EditRestaurantInput,
    ): Promise<EditRestaurantOutput> {
        try {
            const restaurant = await this.restaurants.findOne(
                editRestaurantInput.restaurantId,
                { loadRelationIds: true }
            );
            if(!restaurant) {
                return {
                    accepted: false,
                    error: "Restaurant Not Found",
                };
            }
            if(owner.id !== restaurant.ownerId) {
                return {
                    accepted: false,
                    error: "Not permitted to edit"
                };
            }
            await this.restaurants.save([{
                id: editRestaurantInput.restaurantId,
                ...editRestaurantInput,
            }]);
        } catch (e) {
            return {
                accepted: false,
                error: "Could not edit restaurant",
            };
        }
    }

    async editKeymap(
        owner: User,
        editKeymapInput: EditKeymapInput,
    ): Promise<EditKeymapOutput> {
        try {
            const keymap = await this.keymaps.findOne(
                editKeymapInput.keymapId,
                { loadRelationIds: true }
            );
            if(!keymap) {
                return {
                    accepted: false,
                    error: "Keymap Not Found",
                };
            }
            if(owner.id !== keymap.ownerId) {
                return {
                    accepted: false,
                    error: "Not permitted to edit"
                };
            }
            await this.keymaps.save([{
                id: editKeymapInput.keymapId,
                ...editKeymapInput,
            }]);
        } catch (e) {
            return {
                accepted: false,
                error: "Could not edit keymap",
            };
        }
    }

    async editTouchgroup(
        owner: User,
        editTouchgroupInput: EditTouchgroupInput,
    ): Promise<EditTouchgroupOutput> {
        try {
            const touchgroup = await this.touchgroups.findOne(
                editTouchgroupInput.touchgroupId,
                { loadRelationIds: true }
            );
            if(!touchgroup) {
                return {
                    accepted: false,
                    error: "Touchgroup Not Found",
                };
            }
            if(owner.id !== touchgroup.ownerId) {
                return {
                    accepted: false,
                    error: "Not permitted to edit"
                };
            }
            await this.touchgroups.save([{
                id: editTouchgroupInput.touchgroupId,
                ...editTouchgroupInput,
            }]);
        } catch (e) {
            return {
                accepted: false,
                error: "Could not edit touchgroup",
            };
        }
    }

    async editItem(
        owner: User,
        editItemInput: EditItemInput,
    ): Promise<EditItemOutput> {
        try {
            const item = await this.items.findOne(
                editItemInput.itemId,
                { loadRelationIds: true }
            );
            if(!item) {
                return {
                    accepted: false,
                    error: "Item Not Found",
                };
            }
            if(owner.id !== item.ownerId) {
                return {
                    accepted: false,
                    error: "Not permitted to edit"
                };
            }
            await this.items.save([{
                id: editItemInput.itemId,
                ...editItemInput,
            }]);
        } catch (e) {
            return {
                accepted: false,
                error: "Could not edit item",
            };
        }
    }

    async editOption(
        owner: User,
        editOptionInput: EditOptionInput,
    ): Promise<EditOptionOutput> {
        try {
            const option = await this.options.findOne(
                editOptionInput.optionId,
                { loadRelationIds: true }
            );
            if(!option) {
                return {
                    accepted: false,
                    error: "Option Not Found",
                };
            }
            if(owner.id !== option.ownerId) {
                return {
                    accepted: false,
                    error: "Not permitted to edit"
                };
            }
            await this.options.save([{
                id: editOptionInput.optionId,
                ...editOptionInput,
            }]);
        } catch (e) {
            return {
                accepted: false,
                error: "Could not edit option",
            };
        }
    }

    // delete

    async deleteCompany(
        owner: User,
        { companyId }: DeleteCompanyInput
    ): Promise<DeleteCompanyOutput> {
        try {
            const company = await this.companies.findOne(
                companyId,
            );
            if(!company) {
                return {
                    accepted: false,
                    error: "Company Not Found",
                };
            }
            if(owner.id !== company.ownerId) {
                return {
                    accepted: false,
                    error: "Not permitted to delete",
                };
            }
            await this.companies.delete(companyId);
            return {
                accepted: true,
            };
        } catch (e) {
            return {
                accepted: false,
                error: "Could not delete company",
            };
        }
    }

    async deleteBrand(
        owner: User,
        { brandId }: DeleteBrandInput
    ): Promise<DeleteBrandOutput> {
        try {
            const brand = await this.brands.findOne(
                brandId,
            );
            if(!brand) {
                return {
                    accepted: false,
                    error: "Brand Not Found",
                };
            }
            if(owner.id !== brand.ownerId) {
                return {
                    accepted: false,
                    error: "Not permitted to delete",
                };
            }
            await this.brands.delete(brandId);
            return {
                accepted: true,
            };
        } catch (e) {
            return {
                accepted: false,
                error: "Could not delete brand",
            };
        }
    }

    async deleteRestaurant(
        owner: User,
        { restaurantId }: DeleteRestaurantInput
    ): Promise<DeleteRestaurantOutput> {
        try {
            const restaurant = await this.restaurants.findOne(
                restaurantId,
            );
            if(!restaurant) {
                return {
                    accepted: false,
                    error: "Restaurant Not Found",
                };
            }
            if(owner.id !== restaurant.ownerId) {
                return {
                    accepted: false,
                    error: "Not permitted to delete",
                };
            }
            await this.restaurants.delete(restaurantId);
            return {
                accepted: true,
            };
        } catch (e) {
            return {
                accepted: false,
                error: "Could not delete restaurant",
            };
        }
    }

    async deleteKeymap(
        owner: User,
        { keymapId }: DeleteKeymapInput
    ): Promise<DeleteKeymapOutput> {
        try {
            const keymap = await this.keymaps.findOne(
                keymapId,
            );
            if(!keymap) {
                return {
                    accepted: false,
                    error: "Keymap Not Found",
                };
            }
            if(owner.id !== keymap.ownerId) {
                return {
                    accepted: false,
                    error: "Not permitted to delete",
                };
            }
            await this.keymaps.delete(keymapId);
            return {
                accepted: true,
            };
        } catch (e) {
            return {
                accepted: false,
                error: "Could not delete keymap",
            };
        }
    }

    async deleteTouchgroup(
        owner: User,
        { touchgroupId }: DeleteTouchgroupInput
    ): Promise<DeleteTouchgroupOutput> {
        try {
            const touchgroup = await this.touchgroups.findOne(
                touchgroupId,
            );
            if(!touchgroup) {
                return {
                    accepted: false,
                    error: "Touchgroup Not Found",
                };
            }
            if(owner.id !== touchgroup.ownerId) {
                return {
                    accepted: false,
                    error: "Not permitted to delete",
                };
            }
            await this.touchgroups.delete(touchgroupId);
            return {
                accepted: true,
            };
        } catch (e) {
            return {
                accepted: false,
                error: "Could not delete touchgroup",
            };
        }
    }

    async deleteItem(
        owner: User,
        { itemId }: DeleteItemInput
    ): Promise<DeleteItemOutput> {
        try {
            const item = await this.items.findOne(
                itemId,
            );
            if(!item) {
                return {
                    accepted: false,
                    error: "Item Not Found",
                };
            }
            if(owner.id !== item.ownerId) {
                return {
                    accepted: false,
                    error: "Not permitted to delete",
                };
            }
            await this.items.delete(itemId);
            return {
                accepted: true,
            };
        } catch (e) {
            return {
                accepted: false,
                error: "Could not delete item",
            };
        }
    }

    async deleteOption(
        owner: User,
        { optionId }: DeleteOptionInput
    ): Promise<DeleteOptionOutput> {
        try {
            const option = await this.options.findOne(
                optionId,
            );
            if(!option) {
                return {
                    accepted: false,
                    error: "Option Not Found",
                };
            }
            if(owner.id !== option.ownerId) {
                return {
                    accepted: false,
                    error: "Not permitted to delete",
                };
            }
            await this.options.delete(optionId);
            return {
                accepted: true,
            };
        } catch (e) {
            return {
                accepted: false,
                error: "Could not delete option",
            };
        }
    }

    // find

    async getCompanies(): Promise<FindCompaniesOutput> {
        try {
            const companies = await this.companies.find();
            return {
                accepted: true,
                companies,
            };
        } catch (e) {
            return {
                accepted: false,
                error: "Could not load companies",
            };
        }
    }

    async getBrands(): Promise<FindBrandsOutput> {
        try {
            const brands = await this.brands.find();
            return {
                accepted: true,
                brands,
            };
        } catch (e) {
            return {
                accepted: false,
                error: "Could not load brands",
            };
        }
    }

    async getRestaurants(): Promise<FindRestaurantsOutput> {
        try {
            const restaurants = await this.restaurants.find();
            return {
                accepted: true,
                restaurants,
            };
        } catch (e) {
            return {
                accepted: false,
                error: "Could not load restaurants",
            };
        }
    }

    async getKeymaps(): Promise<FindKeymapsOutput> {
        try {
            const keymaps = await this.keymaps.find();
            return {
                accepted: true,
                keymaps,
            };
        } catch (e) {
            return {
                accepted: false,
                error: "Could not load keymaps",
            };
        }
    }

    async getTouchgroups(): Promise<FindTouchgroupsOutput> {
        try {
            const touchgroups = await this.touchgroups.find();
            return {
                accepted: true,
                touchgroups,
            };
        } catch (e) {
            return {
                accepted: false,
                error: "Could not load touchgroups",
            };
        }
    }

    async getItems(): Promise<FindItemsOutput> {
        try {
            const items = await this.items.find();
            return {
                accepted: true,
                items,
            };
        } catch (e) {
            return {
                accepted: false,
                error: "Could not load items",
            };
        }
    }

    async getOptions(): Promise<FindOptionsOutput> {
        try {
            const options = await this.options.find();
            return {
                accepted: true,
                options,
            };
        } catch (e) {
            return {
                accepted: false,
                error: "Could not load options",
            };
        }
    }
}
