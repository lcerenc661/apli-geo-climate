import { Injectable } from '@nestjs/common';
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
    const parsedRequest = {
      zoneId: request.zone,
      timestamp: request.timestamp,
      temperature: request.temperature,
    };
    const savedRecord = await this.temperatureRepository.save(parsedRequest);

    return new CreateTemperatureRecordResponseDto(
      savedRecord.id,
      savedRecord.zoneId,
      savedRecord.timestamp,
      savedRecord.temperature,
      savedRecord.createdAt,
    );
  }
}
