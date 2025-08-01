import { Module } from '@nestjs/common';
import { ZoneModule } from './contexts/zones/zone.module';
import { TemperatureRecordModule } from './contexts/temperature-records/temperature-record.module';
import { AuthModule } from './contexts/auth/auth.module';

@Module({
  imports: [ZoneModule, TemperatureRecordModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
