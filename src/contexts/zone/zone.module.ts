import { Module } from '@nestjs/common';
import { InMemoryZoneRepository } from './infrastructure/repository-implementations/in-memory/in-memory.zone.repositoryImpl';
import { ZoneController } from './interface/http-api/zone/zone.controller';
import { ZoneRepository } from './domain/repositories/zone.repository';
import { GetZoneAnomaliesUseCase } from './application/use-cases/get-zone-temperature-records-anomalies.use-case';
import { GetZoneSummaryUseCase } from './application/use-cases/get-zone-temperature-records-summary.use-case';
import { TemperatureRecordModule } from '../temperature-record/temperature-record.module';

@Module({
  imports: [TemperatureRecordModule],
  controllers: [ZoneController],
  providers: [
    InMemoryZoneRepository,
    GetZoneAnomaliesUseCase,
    GetZoneSummaryUseCase,
    {
      provide: ZoneRepository,
      useExisting: InMemoryZoneRepository,
    },
  ],
  exports: [GetZoneAnomaliesUseCase, GetZoneSummaryUseCase],
})
export class ZoneModule {}
