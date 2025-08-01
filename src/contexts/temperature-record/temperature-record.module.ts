import { Module } from '@nestjs/common';
import { InMemoryTemperatureRecordRepository } from './infrastructure/repository-implementations/in-memory/in-memory.temperature-record.repositoryImpl';

@Module({
  providers: [InMemoryTemperatureRecordRepository],
  exports: [InMemoryTemperatureRecordRepository],
})
export class TemperatureRecordModule {}
