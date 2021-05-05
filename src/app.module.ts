import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { HealthController } from './health/health.controller';
import { CommonModule } from './common/common.module';

@Module({
  imports: [CatsModule, TerminusModule, CommonModule],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
