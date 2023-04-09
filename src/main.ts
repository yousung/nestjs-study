import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma.service';
import { INestApplication } from '@nestjs/common';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);

  const prismaService: PrismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  await app.listen(3000);
}
bootstrap();
