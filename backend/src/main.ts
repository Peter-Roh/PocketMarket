import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import * as rateLimit from 'express-rate-limit';
import * as session from 'express-session';
import * as compression from 'compression';

async function pocketmarket() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { 
    logger: console
   });
  app.use(helmet({
    contentSecurityPolicy: (process.env.NODE_ENV === 'prod') ? undefined : false
  })); // set security-related HTTP headers. Protect app from some well-known web vulnerabilities
  app.use(cookieParser());
  app.use(session({
    // secure: true // recommended option - requires https enabled websites
    secret: process.env.PRIVATE_KEY,
    resave: false,
    saveUninitialized: false, // reduce server storage usage, comply with laws that require permission before setting a cookie, help with race conditions where a client makes multiple parallel requests without a session
    cookie: { secure: true },
  }));
  app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // Timeframe for which requests are checked / remembered - 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  }));
  app.set('trust proxy', 1); // https://expressjs.com/en/guide/behind-proxies.html
  // may need to be configured to trust the headers set by the proxy in order to get the correct IP for the end user
  // when there is a load balancer or reverse proxy between the server and the internet
  app.use(compression()); // greatly decrease the size of the response body, thereby increasing the speed of a web app
  app.useGlobalPipes(
    new ValidationPipe({
//      whitelist: true, // validation을 위한 decorator가 붙어있지 않은 속성은 제거됨
//      forbidNonWhitelisted: true, // whitelist 설정에서 제거되는 속성이 있으면 HTTP Error 400을 return
      transform: true, // 요청에서 넘어온 자료들의 type 변환 허용
    })
  );
  await app.listen(4000);
}
pocketmarket();
