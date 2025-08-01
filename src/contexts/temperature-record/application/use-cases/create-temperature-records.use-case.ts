import { Injectable } from '@nestjs/common';
import { TemperatureRecord } from '../../domain/entities/temperature-record.entity';
import {
  CreateTemperatureRecordDto,
  CreateTemperatureRecordResponseDto,
} from '../dtos/temperature-records.dto';
import { TemperatureRecordRepository } from '../../domain/repostitories/temperature-record.repository';

@Injectable()
export class CreateTemperatureRecordUseCase {
  constructor(
    private readonly temperatureRepository: TemperatureRecordRepository,
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
      savedRecord.zoneId,
      savedRecord.timestamp.toISOString(),
      savedRecord.temperature,
      savedRecord.createdAt.toISOString(),
    );
  }
}
