import { Module } from '@nestjs/common';
import { InMemoryZoneRepository } from './infrastructure/repository-implementations/in-memory/in-memory.zone.repositoryImpl';
import { ZoneController } from './interface/http-api/zone/zone.controller';
import { ZoneRepository } from './domain/repositories/zone.repository';
import { GetZoneAnomaliesUseCase } from './application/use-cases/get-zone-temperature-records-anomalies.use-case';
import { GetZoneSummaryUseCase } from './application/use-cases/get-zone-temperature-records-summary.use-case';
import { TemperatureRecordModule } from '../temperature-records/temperature-record.module';
import { ValidateZoneUseCase } from './application/use-cases/validate-zone.use-case';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [TemperatureRecordModule],
  controllers: [ZoneController],
  providers: [
    InMemoryZoneRepository,
    GetZoneAnomaliesUseCase,
    GetZoneSummaryUseCase,
    ValidateZoneUseCase,
    {
      provide: ZoneRepository,
      useExisting: InMemoryZoneRepository,
    },
    ConfigService,
  ],
  exports: [
    GetZoneAnomaliesUseCase,
    GetZoneSummaryUseCase,
    ValidateZoneUseCase,
  ],
})
export class ZoneModule {}
