import { Module } from '@nestjs/common';
import { ZoneModule } from './contexts/zone/zone.module';
import { TemperatureRecordModule } from './contexts/temperature-record/temperature-record.module';

@Module({
  imports: [ZoneModule, TemperatureRecordModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
