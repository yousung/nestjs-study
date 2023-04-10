import { Module } from '@nestjs/common';
import { BoardModule } from './board/board.module';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [BoardModule, AuthModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
