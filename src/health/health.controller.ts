import { Controller, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
} from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private http: HttpHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  @ApiOperation({ summary: '서버 상태 확인' })
  check() {
    return this.health.check([
      () => this.http.pingCheck('cats', 'http://localhost:3000/cats'),
      () => this.http.pingCheck('home', 'http://localhost:3000'),
    ]);
  }
}
