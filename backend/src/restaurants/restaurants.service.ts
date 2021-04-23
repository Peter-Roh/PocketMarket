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
    FindRestaurantsInput,
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

// ================================================================================================================
// 이 파일에는 company, brand, restaurant, keymap, touchgroup, item, option과 관련된 기능이 구현되어 있습니다. 
// 각 기능은 위의 순서대로 나열되어 있습니다. 
// 구현된 기능은 다음과 같습니다. 
// create
// edit
// delete
// find - get all, get mine, get one by id
// count
// 영업 시작 / 마감
// ================================================================================================================

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
    // input 받아서 대상 생성
    // 정보 저장
    // save

    async createCompany(
        owner: User,
        createCompanyInput: CreateCompanyInput,
    ): Promise<CreateCompanyOutput> {
        try {
            const newCompany = this.companies.create(createCompanyInput);
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
            newKeymap.owner = owner;
            const restaurant = await this.restaurants.findOne(createKeymapInput.restaurantId);
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
            newTouchgroup.owner = owner;
            const keymap = await this.keymaps.findOne(createTouchgroupInput.keymapId);
            if(!keymap) {
                return {
                    accepted: false,
                    error: "No keymap designated"
                };
            }
            newTouchgroup.keymap = keymap;
            await this.touchgroups.save(newTouchgroup);
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
            newItem.owner = owner;
            const touchgroup = await this.touchgroups.findOne(createItemInput.touchgroupId);
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
            newOption.owner = owner;
            const item = await this.items.findOne(createOptionInput.itemId);
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
    // id 받아서 대상 찾기
    // 수정 권한 확인
    // 수정된 정보 저장

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
            return {
                accepted: true,
            };
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
            return {
                accepted: true,
            };
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
            const restaurant = await this.restaurants.findOne(editRestaurantInput.restaurantId);
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
            return {
                accepted: true,
            };
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
            const keymap = await this.keymaps.findOne(editKeymapInput.keymapId);
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
            return {
                accepted: true,
            };
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
            const touchgroup = await this.touchgroups.findOne(editTouchgroupInput.touchgroupId);
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
            return {
                accepted: true,
            };
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
            const item = await this.items.findOne(editItemInput.itemId);
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
            return {
                accepted: true,
            };
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
            const option = await this.options.findOne(editOptionInput.optionId);
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
            return {
                accepted: true,
            };
        } catch (e) {
            return {
                accepted: false,
                error: "Could not edit option",
            };
        }
    }

    // delete
    // id 받아서 대상 찾기
    // 삭제 권한 확인
    // delete

    async deleteCompany(
        owner: User,
        { companyId }: DeleteCompanyInput
    ): Promise<DeleteCompanyOutput> {
        try {
            const company = await this.companies.findOne(companyId);
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
            const brand = await this.brands.findOne(brandId);
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
            const restaurant = await this.restaurants.findOne(restaurantId);
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
            const keymap = await this.keymaps.findOne(keymapId);
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
            const touchgroup = await this.touchgroups.findOne(touchgroupId);
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
            const item = await this.items.findOne(itemId);
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
            const option = await this.options.findOne(optionId);
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
    // find all

    async getCompanies(): Promise<FindCompaniesOutput> {
        try {
            const companies = await this.companies.find({
                relations: ['owner']
            });
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
            const brands = await this.brands.find({
                relations: ['owner']
            });
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

    async getRestaurants(
        { page }: FindRestaurantsInput
    ): Promise<FindRestaurantsOutput> {
        try {
            const COUNT = 20; // page 당 결과 개수 조절할 것
            const [restaurants, totalResults] = await this.restaurants.findAndCount({
                relations: ['owner'],
                take: COUNT,
                skip: (page - 1) * COUNT,
            });
            return {
                accepted: true,
                totalResults,
                totalPages: Math.ceil(totalResults / COUNT),
                restaurants,
            };
        } catch (e) {
            console.log(e);
            return {
                accepted: false,
                error: "Could not load restaurants",
            };
        }
    }

    async getKeymaps(): Promise<FindKeymapsOutput> {
        try {
            const keymaps = await this.keymaps.find({
                relations: ['owner']
            });
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
            const touchgroups = await this.touchgroups.find({
                relations: ['owner']
            });
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
            const items = await this.items.find({
                relations: ['owner']
            });
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
            const options = await this.options.find({
                relations: ['owner']
            });
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

    // get mine

    async getMyCompanies(owner: User): Promise<FindCompaniesOutput> {
        try {
            const companies = owner.companies;
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

    async getMyBrands(owner: User): Promise<FindBrandsOutput> {
        try {
            const brands = owner.brands;
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

    async getMyRestaurants(owner: User): Promise<FindRestaurantsOutput> {
        try {
            const restaurants = await (await this.restaurants.find()).filter(
                (elt) => {
                    if(elt.ownerId === owner.id) {
                        return true;
                    }
                }
            );
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

    async getMyKeymaps(owner: User): Promise<FindKeymapsOutput> {
        try {
            const keymaps = await (await this.keymaps.find()).filter(
                (elt) => {
                    if(elt.ownerId === owner.id) {
                        return true;
                    }
                }
            );
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

    async getMyTouchgroups(owner: User): Promise<FindTouchgroupsOutput> {
        try {
            const touchgroups = await (await this.touchgroups.find()).filter(
                (elt) => {
                    if(elt.ownerId === owner.id) {
                        return true;
                    }
                }
            );
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

    async getMyItems(owner: User): Promise<FindItemsOutput> {
        try {
            const items = await (await this.items.find()).filter(
                (elt) => {
                    if(elt.ownerId === owner.id) {
                        return true;
                    }
                }
            );
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

    async getMyOptions(owner: User): Promise<FindOptionsOutput> {
        try {
            const options = await (await this.options.find()).filter(
                (elt) => {
                    if(elt.ownerId === owner.id) {
                        return true;
                    }
                }
            );
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

    // find one by id

    async getCompanyById({ companyId }: FindCompanyInput): Promise<FindCompanyOutput> {
        try {
            const company = await this.companies.findOne(companyId);
            if(!company) {
                return {
                    accepted: false,
                    error: "Company Not Found"
                };
            }
            return {
                accepted: true,
                company,
            };
        } catch (e) {
            return {
                accepted: false,
                error: "Could not get company",
            };
        }
    }

    async getBrandById({ brandId }: FindBrandInput): Promise<FindBrandOutput> {
        try {
            const brand = await this.brands.findOne(brandId);
            if(!brand) {
                return {
                    accepted: false,
                    error: "Brand Not Found"
                };
            }
            return {
                accepted: true,
                brand,
            };
        } catch (e) {
            return {
                accepted: false,
                error: "Could not get brand",
            };
        }
    }

    async getRestaurantById({ restaurantId }: FindRestaurantInput): Promise<FindRestaurantOutput> {
        try {
            const restaurant = await this.restaurants.findOne(restaurantId);
            if(!restaurant) {
                return {
                    accepted: false,
                    error: "Restaurant Not Found"
                };
            }
            return {
                accepted: true,
                restaurant,
            };
        } catch (e) {
            return {
                accepted: false,
                error: "Could not get restaurant",
            };
        }
    }

    async getKeymapById({ keymapId }: FindKeymapInput): Promise<FindKeymapOutput> {
        try {
            const keymap = await this.keymaps.findOne(keymapId);
            if(!keymap) {
                return {
                    accepted: false,
                    error: "Keymap Not Found"
                };
            }
            return {
                accepted: true,
                keymap,
            };
        } catch (e) {
            return {
                accepted: false,
                error: "Could not get keymap",
            };
        }
    }

    async getTouchgroupById({ touchgroupId }: FindTouchgroupInput): Promise<FindTouchgroupOutput> {
        try {
            const touchgroup = await this.touchgroups.findOne(touchgroupId);
            if(!touchgroup) {
                return {
                    accepted: false,
                    error: "Touchgroup Not Found"
                };
            }
            return {
                accepted: true,
                touchgroup,
            };
        } catch (e) {
            return {
                accepted: false,
                error: "Could not get touchgroup",
            };
        }
    }

    async getItemById({ itemId }: FindItemInput): Promise<FindItemOutput> {
        try {
            const item = await this.items.findOne(itemId);
            if(!item) {
                return {
                    accepted: false,
                    error: "Item Not Found"
                };
            }
            return {
                accepted: true,
                item,
            };
        } catch (e) {
            return {
                accepted: false,
                error: "Could not get item",
            };
        }
    }

    async getOptionById({ optionId }: FindOptionInput): Promise<FindOptionOutput> {
        try {
            const option = await this.options.findOne(optionId);
            if(!option) {
                return {
                    accepted: false,
                    error: "Option Not Found"
                };
            }
            return {
                accepted: true,
                option,
            };
        } catch (e) {
            return {
                accepted: false,
                error: "Could not get option",
            };
        }
    }


    // count

    async countCompanies(): Promise<number> {
        return this.companies.count();
    }

    async countBrands(): Promise<number> {
        return this.brands.count();
    }

    async countRestaurants(): Promise<number> {
        return this.restaurants.count();
    }

    async countKeymaps(): Promise<number> {
        return this.keymaps.count();
    }

    async countTouchgroups(): Promise<number> {
        return this.touchgroups.count();
    }

    async countItems(): Promise<number> {
        return this.items.count();
    }

    async countOptions(): Promise<number> {
        return this.options.count();
    }

    // open / close restaurant

    async openRestaurant(
        owner: User,
        { restaurantId }: FindRestaurantInput,
    ):Promise<CoreDTO> {
        try {
            const restaurant = await this.restaurants.findOne(restaurantId);
            if(!restaurant) {
                return {
                    accepted: false,
                    error: "Restaurant Not Found"
                };
            }
            if(owner.id !== restaurant.ownerId) {
                return {
                    accepted: false,
                    error: "Not Permitted Behavior"
                };
            }
            if(restaurant.isOpen) {
                return {
                    accepted: false,
                    error: "Restaurant is already open"
                };
            }
            await this.restaurants.save([{
                id: restaurantId,
                isOpen: true,
            }]);
            return {
                accepted: true,
            };
        } catch (e) {
            return {
                accepted: false,
                error: "Could not open restaurant"
            };
        }
    }

    async closeRestaurant(
        owner: User,
        { restaurantId }: FindRestaurantInput,
    ):Promise<CoreDTO> {
        try {
            const restaurant = await this.restaurants.findOne(restaurantId);
            if(!restaurant) {
                return {
                    accepted: false,
                    error: "Restaurant Not Found"
                };
            }
            if(owner.id !== restaurant.ownerId) {
                return {
                    accepted: false,
                    error: "Not Permitted Behavior"
                };
            }
            if(!restaurant.isOpen) {
                return {
                    accepted: false,
                    error: "Restaurant is already closed"
                };
            }
            await this.restaurants.save([{
                id: restaurantId,
                isOpen: false,
            }]);
            return {
                accepted: true,
            };
        } catch (e) {
            return {
                accepted: false,
                error: "Could not close restaurant"
            };
        }
    }
}
