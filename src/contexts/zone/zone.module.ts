import { Module } from '@nestjs/common';
import { InMemoryZoneRepository } from './infrastructure/in-memory/repositoriesImpl/in-memory.zone.repositoryImpl';
import { InMemoryTemperatureRecordRepository } from '../temperature-record/infrastructure/in-memory/repositoriesImpl/in-memory.temperature-record.repositoryImpl';

@Module({
  providers: [InMemoryZoneRepository, InMemoryTemperatureRecordRepository],
  exports: [InMemoryZoneRepository],
})
export class ZoneModule {}
