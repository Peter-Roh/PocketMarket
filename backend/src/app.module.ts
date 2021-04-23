import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import * as Joi from 'joi';
import { User } from './users/entities/user.entity';
import { Verification } from './users/entities/verification.entity';
import { Company } from './restaurants/entities/company.entity';
import { Brand } from './restaurants/entities/brand.entity';
import { Restaurant } from './restaurants/entities/restaurant.entity';
import { Keymap } from './restaurants/entities/keymap.entity';
import { Touchgroup } from './restaurants/entities/touchgroup.entity';
import { Item } from './restaurants/entities/item.entity';
import { Option } from './restaurants/entities/option.entity';
import { Order } from './orders/entities/order.entity';
import { OrderMenu } from './orders/entities/order-menu.entity';
import { Board } from './boards/entities/board.entity';
import { Post } from './boards/entities/post.entity';
import { Comment } from './boards/entities/comment.entity';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { JwtModule } from './jwt/jwt.module';
import { MailModule } from './mail/mail.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { OrdersModule } from './orders/orders.module';
import { UploadsModule } from './uploads/uploads.module';
import { BoardsModule } from './boards/boards.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === "dev" ? ".env.dev" : ".env.test",
      ignoreEnvFile: process.env.NODE_ENV === 'prod', // 서버에 deploy할 때 .env 사용하지 않음
      validationSchema: Joi.object({ // 환경변수 유효성 검사
        NODE_ENV: Joi.string().valid('dev', 'prod', 'test').required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
        PRIVATE_KEY: Joi.string().required(),
        MAILGUN_API_KEY: Joi.string().required(),
        MAILGUN_DOMAIN_NAME: Joi.string().required(),
        MAILGUN_FROM_EMAIL: Joi.string().required(),
      })
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      database: process.env.DB_DATABASE,
      synchronize: process.env.NODE_ENV !== 'prod', // typeorm이 database에 연결할 때 database를 현재 상태로 migrate
      logging: process.env.NODE_ENV !== 'prod' && process.env.NODE_ENV !== 'test',
      entities: [
        User,
        Verification,
        Company,
        Brand,
        Restaurant,
        Keymap,
        Touchgroup,
        Item,
        Option,
        Order,
        OrderMenu,
        Board,
        Post,
        Comment,
      ],
    }),
    GraphQLModule.forRoot({ // code first method 이용
      playground: process.env.NODE_ENV !== 'production',
      installSubscriptionHandlers: true, // enable websocket protocol for subscription
      autoSchemaFile: true,
      context: ({ req, connection }) => {
        return {
          token: req ? req.headers['x-jwt'] : connection.context['x-jwt'],
        };
      },
    }),
    JwtModule.forRoot({
      privateKey: process.env.PRIVATE_KEY,
    }),
    MailModule.forRoot({
      apiKey: process.env.MAILGUN_API_KEY,
      domain: process.env.MAILGUN_DOMAIN_NAME,
      fromEmail: process.env.MAILGUN_FROM_EMAIL,
    }),
    CoreModule,
    AuthModule,
    UsersModule,
    RestaurantsModule,
    OrdersModule,
    UploadsModule,
    BoardsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
