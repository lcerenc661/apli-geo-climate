import { Module } from '@nestjs/common';
import { ZoneModule } from './contexts/zones/zone.module';
import { TemperatureRecordModule } from './contexts/temperature-records/temperature-record.module';

@Module({
  imports: [ZoneModule, TemperatureRecordModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
