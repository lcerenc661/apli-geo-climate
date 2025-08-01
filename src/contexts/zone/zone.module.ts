import { Module } from '@nestjs/common';
import { InMemoryZoneRepository } from './infrastructure/repository-implementations/in-memory/in-memory.zone.repositoryImpl';
import { InMemoryTemperatureRecordRepository } from '../temperature-record/infrastructure/repository-implementations/in-memory/in-memory.temperature-record.repositoryImpl';

@Module({
  providers: [InMemoryZoneRepository, InMemoryTemperatureRecordRepository],
  exports: [InMemoryZoneRepository],
})
export class ZoneModule {}
