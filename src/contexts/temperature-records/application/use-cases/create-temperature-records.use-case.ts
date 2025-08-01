import { Injectable } from '@nestjs/common';
import {
  CreateTemperatureRecordDto,
  CreateTemperatureRecordResponseDto,
} from '../dtos/temperature-records.dto';
import { TemperatureRecordRepository } from '../../domain/repostitories/temperature-record.repository';
import { ValidateZoneUseCase } from 'src/contexts/zones/application/use-cases/validate-zone.use-case';
import {
  InvalidNumberError,
  TemperatureOutOfRangeError,
} from 'src/contexts/shared/error/number-errors';

@Injectable()
export class CreateTemperatureRecordUseCase {
  constructor(
    private readonly temperatureRepository: TemperatureRecordRepository,
    private readonly validateZoneUseCase: ValidateZoneUseCase,
  ) {}

  async execute(
    request: CreateTemperatureRecordDto,
  ): Promise<CreateTemperatureRecordResponseDto> {
    await this.validateZoneUseCase.execute(request.zone);
    if (isNaN(request.temperature)) {
      throw new InvalidNumberError(
        'temperature',
        request.temperature.toString(),
        'is not valid a number',
      );
    }

    if (request.temperature < -50 || request.temperature > 70) {
      throw new TemperatureOutOfRangeError(request.temperature, -50, 70);
    }
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
