import { Module } from '@nestjs/common';
import { BoardModule } from './board/board.module';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [BoardModule, AuthModule, UserModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
