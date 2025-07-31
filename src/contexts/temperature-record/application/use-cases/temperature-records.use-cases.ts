import { Injectable } from '@nestjs/common';
import { TemperatureRecord } from '../../domain/entities/temperature-record.entity';
import {
  CreateTemperatureRecordDto,
  CreateTemperatureRecordResponseDto,
} from '../dtos/temperature-records.dto';
import { InMemoryTemperatureRecordRepository } from '../../infrastructure/in-memory/repositoriesImpl/in-memory.temperature-record.repositoryImpl';

@Injectable()
export class CreateTemperatureRecordUseCase {
  constructor(
    private readonly temperatureRepository: InMemoryTemperatureRecordRepository,
  ) {}

  async execute(
    request: CreateTemperatureRecordDto,
  ): Promise<CreateTemperatureRecordResponseDto> {
    const temperatureRecord = TemperatureRecord.create(
      request.zone,
      request.timestamp,
      request.temperature,
    );

    const savedRecord =
      await this.temperatureRepository.save(temperatureRecord);

    return new CreateTemperatureRecordResponseDto(
      savedRecord.id,
      savedRecord.zone,
      savedRecord.timestamp.toISOString(),
      savedRecord.temperature,
      savedRecord.createdAt.toISOString(),
    );
  }
}
