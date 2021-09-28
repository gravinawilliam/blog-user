import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

@Controller('health')
export class HealthRoute {
  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
    @InjectConnection()
    private defaultConnection: Connection,
  ) {}

  @Get()
  @HealthCheck()
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  check() {
    return this.health.check([
      () => this.db.pingCheck('database'),
      () =>
        this.db.pingCheck('database', { connection: this.defaultConnection }),
    ]);
  }
}
