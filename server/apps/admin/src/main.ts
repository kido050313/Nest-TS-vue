import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // 允许跨域
  app.enableCors();

  // 静态文件托管
  app.useStaticAssets('uploads', {
    prefix: '/uploads'
  })

  const options = new DocumentBuilder()
    .setTitle('后台管理APi')
    .setDescription('供后台服务管理界面调用的服务API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3009);
  console.log('http://localhost:3009/api-docs')
}
bootstrap();
