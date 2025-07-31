import { Module } from '@nestjs/common';
import { InMemoryTemperatureRecordRepository } from './infrastructure/in-memory/repositoriesImpl/in-memory.temperature-record.repositoryImpl';

@Module({
  providers: [InMemoryTemperatureRecordRepository],
  exports: [InMemoryTemperatureRecordRepository],
})
export class TemperatureRecordModule {}
