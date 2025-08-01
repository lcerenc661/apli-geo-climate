import { Module } from '@nestjs/common';
import { InMemoryTemperatureRecordRepository } from './infrastructure/repository-implementations/in-memory/in-memory.temperature-record.repositoryImpl';
import { CreateTemperatureRecordUseCase } from './application/use-cases/create-temperature-records.use-case';
import { TemperatureRecordController } from './interface/http-api/temperature-record/temperature-record.controller';
import { TemperatureRecordRepository } from './domain/repostitories/temperature-record.repository';
import { GetTemperatureSummaryByZoneIdUseCase } from './application/use-cases/get-temperature-summary-by-zone-id.use-case';
import { GetTemperatureAnomaliesByZoneIdUseCase } from './application/use-cases/get-temperature-anomalies-by-zone-id.use-case';

@Module({
  controllers: [TemperatureRecordController],
  providers: [
    InMemoryTemperatureRecordRepository,
    CreateTemperatureRecordUseCase,
    GetTemperatureSummaryByZoneIdUseCase,
    GetTemperatureAnomaliesByZoneIdUseCase,
    {
      provide: TemperatureRecordRepository,
      useExisting: InMemoryTemperatureRecordRepository,
    },
  ],
  exports: [
    GetTemperatureSummaryByZoneIdUseCase,
    GetTemperatureAnomaliesByZoneIdUseCase,
    CreateTemperatureRecordUseCase,
  ],
})
export class TemperatureRecordModule {}
