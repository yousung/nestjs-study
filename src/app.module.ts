import { Module } from '@nestjs/common';
import { BoardModule } from './board/board.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [BoardModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
