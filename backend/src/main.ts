import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function pocketmarket() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // validation을 위한 decorator가 붙어있지 않은 속성은 제거됨
      forbidNonWhitelisted: true, // whitelist 설정에서 제거되는 속성이 있으면 HTTP Error 400을 return
      transform: true, // 요청에서 넘어온 자료들의 type 변환 허용
    })
  );
  await app.listen(4000);
}
pocketmarket();
