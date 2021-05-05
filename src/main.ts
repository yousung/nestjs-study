import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('블로그 배우기')
    .setDescription('학습용')
    .setVersion('0.1.1')
    .addTag('blog')
    .build();
  const docuemnt = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, docuemnt, {
    swaggerOptions: { defaultModelsExpandDepth: -1 },
  });

  app.useGlobalPipes(
    new ValidationPipe({ stopAtFirstError: true, whitelist: true }),
  );

  await app.listen(3000);
}
bootstrap();
