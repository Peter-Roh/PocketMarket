import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Brand } from './entities/brand.entity';
import { Restaurant } from './entities/restaurant.entity';
import { Keymap } from './entities/keymap.entity';
import { Touchgroup } from './entities/touchgroup.entity';
import { Item } from './entities/item.entity';
import { Option } from './entities/option.entity';
import { RestaurantsResolver } from './restaurants.resolver';
import { RestaurantsService } from './restaurants.service';

@Module({
    imports: [TypeOrmModule.forFeature([
        Company,
        Brand,
        Restaurant,
        Keymap,
        Touchgroup,
        Item,
        Option,
    ])],
    providers: [RestaurantsResolver, RestaurantsService],
})
export class RestaurantsModule {}
