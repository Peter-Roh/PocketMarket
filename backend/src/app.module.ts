import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { CoreModule } from './core/core.module';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === "dev" ? ".env.dev" : ".env.test",
      ignoreEnvFile: process.env.NODE_ENV === 'prod', // 서버에 deploy할 때 .env 사용하지 않음
      validationSchema: Joi.object({ // 환경변수 유효성 검사
        NODE_ENV: Joi.string().valid('dev', 'prod').required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
      })
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      database: process.env.DB_DATABASE,
      synchronize: process.env.NODE_ENV !== 'prod', // typeorm이 database에 연결할 때 database를 현재 상태로 migrate
      logging: process.env.NODE_ENV !== 'prod',
      entities: [User],
    }),
    GraphQLModule.forRoot({ // code first method 이용
      autoSchemaFile: true,
    }),
    CoreModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
